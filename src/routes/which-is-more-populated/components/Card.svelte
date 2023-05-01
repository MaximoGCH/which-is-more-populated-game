<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { ItemDataWithPosition } from '../gameTypes';
	import { createEventDispatcher } from 'svelte';

	let clicked = false;
	export let data: ItemDataWithPosition;
	export let showButton: boolean;
	export let showData: boolean;
	const dispatch = createEventDispatcher<{ click: () => void }>();

	let pos = data.position;
	$: {
		if (data.position !== pos) {
			pos = data.position;
			clicked = false;
		}
	}

	const urlSplit = data.image[0].split('.');
	const last = urlSplit.pop();
	const first = urlSplit.join('.');
	const url =
		decodeURIComponent(
			first
				.replaceAll('%28', '-')
				.replaceAll('%29', '-')
				.replaceAll('%2C', '-')
				.replaceAll('.', '-')
		).slice(0, 60) +
		'.' +
		last;
</script>

<div
	class="card"
	class:left={data.position === 'left'}
	class:right={data.position === 'right'}
	in:fly={{ y: -10, delay: data.position === 'right' ? 80 : 0 }}
>
	<img src={`/city-population-api/image/${url}`} alt={data.name} />
	<div class="credits">
		by {@html data.artist} <br />
		<a href={data.license.url || '#'}>{data.license.value}</a>
	</div>
	<button
		disabled={!showButton}
		class:clicked
		on:click={() => {
			dispatch('click');
			clicked = true;
		}}
		in:fly={{ x: -10, delay: data.position === 'right' ? 240 : 160 }}
		out:fly|local={{ x: 10, delay: data.position === 'right' ? 500 : 580 }}
	>
		{data.name}, {data.country}
	</button>

	{#if showData}
		<div class="data" in:fly={{ x: -10, delay: data.position === 'right' ? 100 : 160 }}>
			{data.population.value.toLocaleString()} inhabitants
		</div>
	{/if}
</div>

<style lang="scss">
	.credits {
		font-size: 8px;
		position: absolute;
		right: 5px;
		top: 5px;
		background-color: var(--background-color-1);
		color: var(--text-color-2);
		text-decoration: none;
		padding: 1px 3px;
		text-align: right;
		max-width: 100px;
		max-height: 30px;
		overflow: hidden;
		white-space: nowrap;

		&:hover,
		&:active {
			max-width: max-content;
			max-height: max-content;
		}

		:global(*) {
			color: var(--text-color-2);
			text-decoration: none;
		}
	}

	.card {
		position: absolute;
		width: calc(50% - 5px);
		height: 100%;
		overflow: hidden;
		background-color: var(--background-color-1);
		box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		overflow: hidden;
		transition: 0.5s;

		&.left {
			left: 0%;
			transform: translate(0%);
		}

		&.right {
			left: 100%;
			transform: translate(-100%);
		}

		@media screen and (max-width: 600px) {
			height: calc(50% - 5px);
			width: 100%;

			&.left {
				left: 0;
				top: 0;
				transform: translate(0, 0);
			}

			&.right {
				left: 0;
				top: 100%;
				transform: translate(0, -100%);
			}
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		.data {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			color: var(--text-color-4);
			font-size: 40px;
			font-weight: 600;
			text-align: center;
			text-shadow: 0px 3px 4px rgba(0, 0, 0, 0.8);
		}

		button {
			position: absolute;
			bottom: 10px;
			left: 50%;
			transform: translate(-50%);
			background-color: var(--background-color-3);
			border: none;
			padding: 10px 20px;
			color: var(--text-color-4);
			box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.5);
			border-radius: 10px;
			font-size: 18px;
			margin-top: 50;
			cursor: pointer;
			transition: 0.2s;

			&.clicked {
				background-color: var(--background-color-2);
				color: var(--text-color-3);
			}
		}
	}
</style>
