<script lang="ts">
	import { isMenuOpen } from '$lib/stores.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	const navItems = [
		// { id: '/', label: 'home' },
		{ id: '/projects', label: 'projects' },
		{ id: '/blog', label: 'blog' },
		{ id: '/about', label: 'about' },
		{ id: '/contact', label: 'contact' }
	];

	function handleNavClick(path: string) {
		goto(path);
		isMenuOpen.set(false);
	}

	function toggleMenu() {
		isMenuOpen.update(open => !open);
	}
</script>

<header class="header">
	<div class="container nav-center">
		<div class="nav-container">
			<!-- Logo/Brand -->
			<button class="brand" aria-label="Go to home page" on:click={() => goto('/')} style="cursor:pointer; background:none; border:none; padding:0;">
				<span class="bracket">{'{'}</span>
				<span class="brand-text">orynx</span>
				<span class="bracket">{'}'}</span>
			</button>

			<!-- Desktop Navigation -->
			<nav class="nav-desktop">
				{#each navItems as item}
					<button 
						class="nav-link" 
						class:active={$page.url.pathname === item.id}
						on:click={() => handleNavClick(item.id)}
						aria-label={item.label}
					>
					    <span class="nav-prefix">&gt;</span>
						{item.label}
					</button>
				{/each}
			</nav>

			<!-- Mobile Menu Button (always visible on mobile, animates to X when open) -->
			<button class="menu-toggle" on:click={toggleMenu} aria-label="Toggle navigation menu">
				<span class="menu-icon" class:open={$isMenuOpen}></span>
			</button>
		</div>

		<!-- Mobile Navigation -->
		{#if $isMenuOpen}
			<nav class="nav-mobile nav-mobile-overlay">
				<div class="nav-mobile-links">
					{#each navItems as item}
						<button 
							class="nav-link-mobile" 
							class:active={$page.url.pathname === item.id}
							on:click={() => handleNavClick(item.id)}
							aria-label={item.label}
						>
							{item.label}
						</button>
					{/each}
				</div>
			</nav>
		{/if}
	</div>
</header>

<style>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background: transparent;
		backdrop-filter: blur(7px);
		height: 5.5rem;
	}

	.nav-center {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.nav-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem 0;
		width: 100%;
		max-width: 1200px;
	}

	.brand {
		font-size: 2rem;
		font-weight: 700;
		color: var(--signal-orange);
		font-family: Space Mono, monospace;
	}

	.bracket {
		color: var(--text-fog);
		transition: color 0.2s;
	}

	.brand:hover .bracket {
		color: var(--signal-orange);
	}

	.brand-text {
		color: var(--white-static);
		margin: 0 0.2rem;
	}

	.nav-desktop {
		display: flex;
		gap: 2rem;
	}

	.nav-link {
		background: none;
		border: none;
		color: var(--text-fog);
		font-family: inherit;
		font-size: 1.2rem;
		cursor: pointer;
		transition: all 0.3s ease;
		padding: 0.8rem 0;
		position: relative;
	}

	.nav-link:hover,
	.nav-link.active {
		color: var(--signal-orange);
	}

	.nav-prefix {
		opacity: 0;
		transition: opacity 0.3s ease;
		margin-right: 0.3rem;
	}

	.nav-link:hover .nav-prefix,
	.nav-link.active .nav-prefix {
		opacity: 1;
	}

	.menu-toggle {
		display: none;
		background: none;
		border: none;
		color: var(--white-static);
		cursor: pointer;
		padding: 0.5rem;
	}

	.menu-icon {
		display: block;
		width: 20px;
		height: 2px;
		background: var(--signal-orange);
		position: relative;
		transition: all 0.3s ease;
	}

	.menu-icon::before,
	.menu-icon::after {
		content: '';
		position: absolute;
		width: 20px;
		height: 2px;
		background: var(--signal-orange);
		transition: all 0.3s ease;
	}

	.menu-icon::before {
		top: -6px;
	}

	.menu-icon::after {
		bottom: -6px;
	}

	.menu-icon.open {
		background: transparent;
	}

	.menu-icon.open::before {
		transform: rotate(45deg);
		top: 0;
	}

	.menu-icon.open::after {
		transform: rotate(-45deg);
		bottom: 0;
	}

	.nav-mobile {
		display: none;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem 0;
		border-top: 1px solid var(--text-fog);
		background: rgba(15, 15, 15, 0.98);
	}

	.nav-link-mobile {
		background: none;
		border: none;
		color: var(--text-fog);
		font-family: inherit;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.3s ease;
		padding: 0.8rem 0;
		text-align: left;
	}

	.nav-link-mobile:hover,
	.nav-link-mobile.active {
		color: var(--signal-orange);
	}

	/* Fullscreen mobile menu overlay */
	@media (max-width: 768px) {
		.nav-desktop {
			display: none;
		}

		.menu-toggle {
			display: block;
			position: fixed;
			top: 2rem;
			right: 2rem;
			z-index: 2101;
			background: none;
			border: none;
			color: var(--white-static);
			cursor: pointer;
			padding: 0.5rem;
		}

		.nav-mobile.nav-mobile-overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background: var(--void-black);
			z-index: 2000;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 0;
			border: none;
			animation: fadeInScale 0.3s ease-out forwards;
		}
		.nav-mobile-links {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 2.5rem;
			width: 100%;
		}
		.nav-link-mobile {
			font-size: 1.5rem;
			text-align: center;
			width: 100vw;
			background: none;
			border: none;
			color: var(--text-fog);
			padding: 1.2rem 0;
		}
		.nav-link-mobile.active, .nav-link-mobile:hover {
			color: var(--signal-orange);
		}
	}
</style>
