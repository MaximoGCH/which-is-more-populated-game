import { derived, get as getState, writable } from 'svelte/store';
import fsm from 'svelte-fsm';
import { produce } from 'immer';
import { shuffleList } from './shuffle';
import type { ItemUrl, GameState, ItemData } from './gameTypes';
import { getItemData } from './getItemData';

export const createGameStore = () => {
	const state = writable<GameState>({
		cardPile: []
	});

	const { set, update } = state;
	const get = () => getState(state);

	const sm = fsm('notStarted', {
		notStarted: {
			_enter() {
				set({
					cardPile: []
				});
			},
			startGame: (items: ItemUrl[]) => {
				const list = shuffleList(items);

				set({
					cardPile: list
				});
				return 'loadingInitialCards';
			}
		},
		loadingInitialCards: {
			async _enter() {
				const cards = await Promise.all(get().cardPile.splice(0, 2).map(getItemData));
				update(
					produce((state) => {
						state.cardPile.shift();
					})
				);
				this.loaded(cards);
			},
			loaded(cards: ItemData[]) {
				update(
					produce((state) => {
						state.game = {
							cards: [
								{ ...cards[0], position: 'left' },
								{ ...cards[1], position: 'right' }
							],
							score: 0
						};
					})
				);
				return 'selectingCard';
			}
		},
		selectingCard: {
			select: (selected: 'right' | 'left') => {
				const state = get();

				if (!state.game) throw 'Unexpected state';

				const lenght = state.game.cards.length;
				const heightLeft = state.game.cards[lenght - 2].population.value;
				const heightRight = state.game.cards[lenght - 1].population.value;
				const winner =
					heightLeft === heightRight ||
					(heightLeft > heightRight && selected === 'left') ||
					(heightLeft < heightRight && selected === 'right');

				if (winner) {
					return 'showingWin';
				}

				return 'showingLost';
			}
		},
		showingWin: {
			_enter() {
				this.onAnimationEnd.debounce(2000);
			},
			onAnimationEnd: () => {
				update(
					produce((state) => {
						if (!state.game) throw 'Unexpected state';

						state.game.score++;
					})
				);
				return 'loadingCard';
			}
		},
		loadingCard: {
			async _enter() {
				const newCard = await getItemData(get().cardPile[0]);
				update(
					produce((state) => {
						state.cardPile.shift();
					})
				);
				this.loaded(newCard);
			},

			loaded(card: ItemData) {
				update(
					produce((state) => {
						if (!state.game) throw 'Unexpected state';

						const lenght = state.game.cards.length;
						state.game.cards[lenght - 1].position = 'left';
						state.game.cards.push({ ...card, position: 'right' });
						state.game.cards.shift();
					})
				);

				return 'selectingCard';
			}
		},
		showingLost: {
			_enter() {
				this.onAnimationEnd.debounce(3000);
			},
			onAnimationEnd: 'notStarted'
		}
	});

	const { subscribe } = derived([state, sm], (s) => ({ ...s[0], smState: s[1] }));
	return {
		subscribe,
		get,
		sm
	};
};

export type GameStore = ReturnType<typeof createGameStore>;
