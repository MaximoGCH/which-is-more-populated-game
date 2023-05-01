<script>
	import { theme } from '$lib/themeStore';
</script>

<div class="theme" class:dark={$theme === 'dark'} class:light={$theme === 'light'}>
	<slot />
</div>

<style lang="scss">
	.theme {
		display: flex;
		flex-direction: column;
		background-color: var(--background-color-1);

		:global(*) {
			font-family: 'Roboto', sans-serif;
			box-sizing: border-box;
		}

		&.light {
			--background-color-1: #ffffff;
			--background-color-2: #f8fafc;
			--background-color-3: #06b6d4;
			--line-color-1: #f1f5f9;
			--text-color-1: #0f172a;
			--text-color-2: #6495c3;
			--text-color-3: #87b9d4;
			--text-color-4: #ffffff;
		}

		&.dark {
			--background-color-1: #1e293b;
			--background-color-2: #475569;
			--background-color-3: #22d3ee;
			--line-color-1: #64748b;
			--text-color-1: #f8fadc;
			--text-color-2: #9099b0;
			--text-color-3: #22d3d1;
			--text-color-4: #f8fadc;
		}
	}
</style>
