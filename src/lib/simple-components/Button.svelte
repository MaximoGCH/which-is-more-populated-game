<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		click: () => void;
	}>();
</script>

<button on:click={() => dispatch('click')}><slot /></button>
