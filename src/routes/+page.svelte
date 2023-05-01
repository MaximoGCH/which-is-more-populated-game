<script lang="ts">
	import FaTwitterSquare from 'svelte-icons/fa/FaTwitterSquare.svelte';
	import FaEnvelope from 'svelte-icons/fa/FaEnvelope.svelte';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
</script>

<div class="background">
	<div class="content">
		<h1>Hi, I'm <span>Maximo</span></h1>
		<p>Here you can find things that<br /> I made when I'm procrastinating.</p>
		<img src="/logos/maximo.png" alt="maximo" />
		<p>Want to <a href="/which-is-more-populated">play a guessing game?</a></p>
		<nav>
			<a href="https://twitter.com/MaximoGCH">
				<FaTwitterSquare />
			</a>
			<a href="mailto:maximo.garcia.cesto@gmail.com">
				<FaEnvelope />
			</a>
		</nav>
	</div>
</div>

<style lang="scss">
	:global(*) {
		font-family: 'Roboto', sans-serif;
		box-sizing: border-box;
	}

	.background {
		width: 100vw;
		height: 100vh;
		background-image: url('/drawings/3d-renders/cliff.png');
		background-position: center;
		background-size: cover;
		position: relative;
		overflow: auto;

		@media screen and (max-width: 800px) {
			background-position: bottom;
			background-size: contain;
			background-repeat: no-repeat;
			background-color: #7b9cb9;
		}

		--color-1: #e1f1fd;
		--color-2: #ffffff;

		--background-color-1: #7b9cb9;
		--background-color-3: #e1f1fd;

		.content {
			position: absolute;
			left: 60vw;
			width: 100vw;
			height: fit-content;
			max-width: 400px;
			max-height: 500px;
			background-color: rgba(171, 203, 226, 0.7);
			padding: 10px 20px;
			bottom: 55vh;
			color: var(--color-1);

			@media screen and (max-width: 1100px) {
				left: 50vw;
			}

			@media screen and (max-width: 800px) {
				left: 0;
				max-width: 100vw;
			}

			@media screen and (max-height: 600px) {
				top: 50px;
			}

			h1 {
				margin: 0;
				font-family: 'Fugaz One', cursive;

				span {
					font-family: 'Fugaz One', cursive;
				}
			}

			span,
			a {
				color: var(--color-2);
				font-weight: 600;
			}

			img {
				width: 100px;
				position: absolute;
				right: 80px;
				top: 30px;
				transform: translate(50%, -50%) rotate(10deg);

				@media screen and (max-width: 500px) {
					width: 80px;
					right: 60px;
					top: 25px;
				}
			}

			nav {
				display: flex;
				flex-direction: row;
				gap: 10px;
				justify-content: right;

				a {
					:global(svg) {
						height: 20px;
						color: var(--color-1);
					}
				}
			}
		}
	}
</style>
