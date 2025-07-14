<script lang="ts">
	import '../app.css';
	import GridBackground from '$lib/components/GridBackground.svelte';
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';

	let { children } = $props();
</script>

<GridBackground />
{#if $page.url.pathname !== '/'}
	<Header />
	<div class="header-spacer"></div>
{/if}
{@render children()}
