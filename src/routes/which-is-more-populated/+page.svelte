<script lang="ts">
	import { fly } from 'svelte/transition';
	import Layout from './components/Layout.svelte';
	import Card from './components/Card.svelte';
	import NotStarted from './states/NotStarted.svelte';
	import { createGameStore } from './gameState';
	import FaCheck from 'svelte-icons/fa/FaCheck.svelte';
	import FaTimes from 'svelte-icons/fa/FaTimes.svelte';
	import { onMount } from 'svelte';

	let gameStore = createGameStore();
	let record = 0;
	onMount(() => {
		record = Number(localStorage.getItem('what-is-more-populated-record') || '0');
	});
	$: {
		if ($gameStore.game?.score && $gameStore.game.score > record) {
			record = $gameStore.game?.score;
			localStorage.setItem('what-is-more-populated-record', `${record}`);
		}
	}
</script>

<Layout score={$gameStore.game?.score || 0} maxScore={record}>
	{#if $gameStore.smState === 'notStarted'}
		<NotStarted {gameStore} />
	{/if}
	{#if $gameStore.game}
		<div class="card-list">
			{#each $gameStore.game.cards as card, i (card.name)}
				<Card
					showData={i === 0 ||
						$gameStore.smState === 'showingWin' ||
						$gameStore.smState === 'showingLost'}
					data={card}
					showButton={$gameStore.smState === 'selectingCard'}
					on:click={() => gameStore.sm.select(i === 0 ? 'left' : 'right')}
				/>
			{/each}
		</div>
	{/if}
	{#if $gameStore.smState === 'showingWin'}
		<div class="result win" in:fly={{ y: 50, delay: 1000 }} out:fly|local={{ y: -50 }}>
			<FaCheck />
		</div>
	{/if}
	{#if $gameStore.smState === 'showingLost'}
		<div class="result lost" in:fly={{ y: 50, delay: 1000 }}>
			<FaTimes />
		</div>
	{/if}
</Layout>

<style lang="scss">
	.card-list {
		position: relative;
		height: 100%;
		width: 100%;
		overflow: hidden;
	}

	.result {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

		&.win {
			color: rgb(45, 255, 45);
		}

		&.lost {
			color: rgb(255, 63, 63);
		}

		:global(svg) {
			width: 100px;
		}
	}
</style>
