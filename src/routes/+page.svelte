<script>
	import Hero from '$lib/components/Hero.svelte';
</script>

<svelte:head>
	<title>orynx</title>
	<meta name="description" content="Writing at the edge of logic and design—code, math, physics, systems, and stories that cut deep." />
	<link rel="canonical" href="https://orynx.space/" />
	<meta property="og:title" content="orynx" />
	<meta property="og:description" content="Writing at the edge of logic and design—code, math, physics, systems, and stories that cut deep." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://orynx.space/" />
	<meta property="og:image" content="https://orynx.space/img.webp" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="orynx" />
	<meta name="twitter:description" content="Writing at the edge of logic and design—code, math, physics, systems, and stories that cut deep." />
	<meta name="twitter:image" content="https://orynx.space/img.webp" />
</svelte:head>

<main class="app centered-app">
	<section class="centered-section">
		<Hero />
	</section>
</main>

<style>
	.app.centered-app {
		position: relative;
		z-index: 2;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}

	.centered-section {
		min-height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100vw;
	}

	@media (max-width: 768px) {
		.centered-section {
			padding-top: 0px;
		}
	}
</style>
