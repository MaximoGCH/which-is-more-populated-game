<script lang="ts">
	import { browser } from '$app/environment';
	import { fly } from 'svelte/transition';
	import type { GameStore } from '../gameState';
	import FaGlobeAmericas from 'svelte-icons/fa/FaGlobeAmericas.svelte';
	import FaGlobeEurope from 'svelte-icons/fa/FaGlobeEurope.svelte';
	import FaGlobeAsia from 'svelte-icons/fa/FaGlobeAsia.svelte';
	import FaGlobeAfrica from 'svelte-icons/fa/FaGlobeAfrica.svelte';
	import FaGlobeOceania from './../components/FaGlobeOceania.svelte';
	import FaGlobe from 'svelte-icons/fa/FaGlobe.svelte';
	import FaCity from 'svelte-icons/fa/FaCity.svelte';
	import FaBuilding from 'svelte-icons/fa/FaBuilding.svelte';
	import FaHome from 'svelte-icons/fa/FaHome.svelte';
	import type { ItemUrl } from '../gameTypes';

	const continents = [
		{
			name: 'The world',
			value: 'countries',
			icon: FaGlobe
		},
		{
			name: 'Europe',
			value: 'europe',
			icon: FaGlobeEurope
		},
		{
			name: 'America',
			value: 'america',
			icon: FaGlobeAmericas
		},
		{
			name: 'Asia',
			value: 'asia',
			icon: FaGlobeAsia
		},
		{
			name: 'Africa',
			value: 'africa',
			icon: FaGlobeAfrica
		},
		{
			name: 'Oceania',
			value: 'oceania',
			icon: FaGlobeOceania
		}
	];

	const difficulties = [
		{
			name: 'Beginner',
			value: 2,
			icon: FaCity,
			description: 'the bigger cities'
		},
		{
			name: 'Advanced',
			value: 6,
			icon: FaBuilding,
			description: 'big to medium cities'
		},
		{
			name: 'Expert',
			value: Infinity,
			icon: FaHome,
			description: 'big to small cities'
		}
	];

	let selectedContinent = browser
		? Number(localStorage.getItem('what-is-more-populated-last-continent') || 0)
		: 0;
	let selectedDifficulty = browser
		? Number(localStorage.getItem('what-is-more-populated-last-difficulty') || 0)
		: 0;

	export let gameStore: GameStore;

	const onPlay = async () => {
		localStorage.setItem('what-is-more-populated-last-continent', `${selectedContinent}`);
		localStorage.setItem('what-is-more-populated-last-difficulty', `${selectedDifficulty}`);

		const countryRequest = await fetch(
			`city-population-api/data/${selectedContinentData.value}.json`
		);
		const countries = (await countryRequest.json()) as string[];
		const countriesCities = (
			await Promise.all(
				countries.map(async (country) => {
					const cityRequest = await fetch(`city-population-api/data/${country}/cities.json`);
					const cities = (await cityRequest.json()) as string[];
					const filteredDifficultyCities = cities.slice(0, selectedDifficultyData.value);
					return filteredDifficultyCities.map(
						(city) =>
							({
								city,
								country
							} as ItemUrl)
					);
				})
			)
		).reduce((arr, countryCities) => arr.concat(countryCities), []);

		gameStore.sm.startGame(countriesCities);
	};

	$: selectedContinentData = continents[selectedContinent];
	$: selectedDifficultyData = difficulties[selectedDifficulty];
</script>

<div class="center">
	<div class="theme-selector">
		{#each continents as continent, i}
			<button
				class="theme"
				class:active={selectedContinent === i}
				on:click={() => (selectedContinent = i)}
			>
				<div class="icon">
					<svelte:component this={continent.icon} />
				</div>
				<div class="name">
					{continent.name}
				</div>
			</button>
		{/each}
	</div>
	<div class="theme-selector">
		{#each difficulties as difficulty, i}
			<button
				class="theme"
				class:active={selectedDifficulty === i}
				on:click={() => (selectedDifficulty = i)}
			>
				<div class="icon">
					<svelte:component this={difficulty.icon} />
				</div>
				<div class="name">
					{difficulty.name}
				</div>
			</button>
		{/each}
	</div>

	<div class="theme-explanation">
		Play with
		{#key selectedDifficulty}
			<span in:fly={{ y: 10 }}>{selectedDifficultyData.description.toLowerCase()}</span>
		{/key}
		of each country in
		{#key selectedContinent}
			<span in:fly={{ y: 10 }}> {selectedContinentData.name.toLowerCase()}.</span>
		{/key}
	</div>

	<button class="play" on:click={onPlay}>Play</button>
</div>

<style lang="scss">
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100%;
		flex-direction: column;
		gap: 30px;

		.theme-explanation {
			color: var(--text-color-1);
			font-size: 20px;

			span {
				color: var(--text-color-3);
				font-weight: 600;
				display: inline-block;
			}
		}

		.theme-selector {
			display: flex;
			flex-direction: row;
			gap: 20px;
			overflow: auto;
			width: 100%;
			justify-content: center;

			@media screen and (max-width: 800px) {
				justify-content: left;
			}

			.theme {
				display: flex;
				flex-direction: column;
				gap: 10px;
				align-items: center;
				padding: 10px;
				border: 3px solid var(--background-color-3);
				border-radius: 10px;
				background: none;
				color: var(--background-color-3);
				fill: var(--background-color-3);
				font-size: 15px;
				cursor: pointer;
				transition: 0.2s;
				width: 100px;
				flex-shrink: 0;

				&.active {
					background-color: var(--background-color-3);
					color: var(--text-color-4);
					fill: var(--text-color-4);

					box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.2);
				}

				.icon {
					width: 50px;

					:global(svg) {
						height: 30px;
					}
				}
			}
		}

		.play {
			background-color: var(--background-color-3);
			border: none;
			padding: 15px 80px;
			color: var(--text-color-4);
			box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.2);
			border-radius: 10px;
			font-size: 25px;
			margin-top: 50;
			cursor: pointer;
		}
	}
</style>
