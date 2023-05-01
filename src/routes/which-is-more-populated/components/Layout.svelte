<script lang="ts">
	import { fly } from 'svelte/transition';
	import { theme } from '$lib/themeStore.ts';
	import FaSun from 'svelte-icons/fa/FaSun.svelte';
	import FaMoon from 'svelte-icons/fa/FaMoon.svelte';
	import Theme from '$lib/simple-components/Theme.svelte';
	export let score: number;
	export let maxScore: number;
</script>

<Theme>
	<div class="layout-wrapper">
		<div class="layout">
			<header>
				<h1>Which is <span>more populated?</span></h1>
				<div class="score">
					score:
					{#key score}
						<span in:fly={{ y: -10 }}>{score}</span>
					{/key}
				</div>
				<div class="spacer" />
				<div class="score">
					record:
					{#key maxScore}
						<span in:fly={{ y: -10 }}>{maxScore}</span>
					{/key}
				</div>
				<div class="spacer-mobile" />
				<button
					class="theme-selector"
					on:click={() => theme.set($theme === 'dark' ? 'light' : 'dark')}
				>
					<div class="back" class:right={$theme === 'dark'}>
						{#if $theme === 'light'}
							<FaSun />
						{:else}
							<FaMoon />
						{/if}
					</div>
					<div class="item" class:active={$theme === 'light'}><FaSun /></div>
					<div class="item" class:active={$theme === 'dark'}><FaMoon /></div>
				</button>
			</header>
			<div class="body">
				<slot />
			</div>
		</div>
	</div>
</Theme>

<style lang="scss">
	.layout-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;

		.layout {
			display: flex;
			flex-direction: column;
			width: 100vw;
			height: 100vh;
			max-width: 1000px;
			max-height: 500px;

			@media screen and (max-width: 600px) {
				max-height: 100vh;
			}

			header {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin: 10px;
				background-color: var(--background-color-2);
				border: 1px solid var(--line-color-1);
				padding: 5px 20px;
				border-radius: 10px;
				box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
				gap: 20px;

				@media screen and (max-width: 600px) {
					flex-wrap: wrap;
				}

				h1 {
					margin: 0;
					font-size: 18px;
					color: var(--text-color-1);
					font-family: 'Fugaz One', cursive;
					font-weight: 400;

					@media screen and (max-width: 600px) {
						width: 100%;
					}

					span {
						color: var(--text-color-3);
						font-family: 'Fugaz One', cursive;
						font-weight: 400;
					}
				}

				.score {
					color: var(--text-color-1);

					span {
						display: inline-block;
						color: var(--text-color-3);
						font-weight: 600;
					}
				}

				.spacer {
					flex: 1 1 auto;
					height: 0;

					@media screen and (max-width: 600px) {
						display: none;
					}
				}

				.spacer-mobile {
					display: none;
				}

				@media screen and (max-width: 600px) {
					.spacer-mobile {
						display: block;
						flex: 1 1 auto;
						height: 0;
					}
				}

				.theme-selector {
					border: none;
					background: var(--background-color-3);
					display: flex;
					align-items: center;
					padding: 0;
					border-radius: 50px;
					cursor: pointer;
					position: relative;

					:global(svg) {
						width: 16px;
					}

					.back {
						margin: 2px;
						padding: 5px;
						display: flex;
						align-items: center;
						border-radius: 50px;
						background-color: var(--text-color-4);
						color: var(--background-color-3);
						position: absolute;
						margin: 2px;
						top: 0;
						left: 0;
						transition: 0.4s left;

						&.right {
							left: 50%;
						}
					}

					.item {
						margin: 2px;
						padding: 5px;
						display: flex;
						align-items: center;
						border-radius: 50px;
						color: var(--background-color-1);
						transition: 0.2s color;

						&.active {
							color: var(--background-color-3);
						}
					}
				}
			}

			.body {
				margin: 0 10px 10px 10px;
				overflow: auto;
				flex: 1 1 0;
			}
		}
	}
</style>
