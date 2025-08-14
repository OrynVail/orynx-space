<script lang="ts">
	import { onMount } from 'svelte';

	let projectsVisible = false;
	let projectsContainer: HTMLElement;

	interface CustomLink {
		title: string;
		link: string;
	}

	interface Project {
		id: number;
		title: string;
		description: string;
		tech: string[];
		status: 'active' | 'completed' | 'in-progress';
		github: string | null; // Set to null to hide GitHub button
		demo: string | null; // Set to null to hide demo button
		custom: CustomLink | null; // Set to {title: 'button text', link: 'url'} to show custom button
	}

	const projects = [
		{
			id: 4,
			title: 'OrynOS',
			description: 'A declarative, high-performance NixOS configuration built with Hyprland. Fast, sovereign, and reproducible.',
			tech: ['NixOS Unstable', 'Hyprland', 'Nix flakes'],
			status: 'active',
			github: 'https://github.com/OrynVail/OrynOS',
			demo: null,
			custom: null
		},
		{
			id: 3,
			title: 'Startlight',
			description: 'A minimal startpage made with Svelte where every new tab becomes a gateway to serenity, kissed by Catppuccins beauty.',
			tech: ['Svelte', 'CSS', 'JavaScript', 'HTML'],
			status: 'completed',
			github: 'https://github.com/OrynVail/Startlight',
			demo: null,
			custom: null
		},
		{
			id: 1,
			title: 'init-1',
			description: 'init1 is an ultra-minimal, terminal-inspired landing page. Fast, responsive, and distractionless.',
			tech: ['Svelte', 'TailwindCSS', 'Netlify'],
			status: 'completed',
			github: 'https://github.com/OrynVail/orynx-init1',
			demo: 'https://init1.netlify.app',
			custom: null
		},
    {
			id: 2,
			title: 'orynx.space',
			description: 'You’re looking at it. A terminal-inspired portfolio, hand-coded in Svelte.',
			tech: ['SvelteKit', 'CSS', 'Netlify'],
			status: 'completed',
			github: 'https://github.com/OrynVail/orynx-space',
			demo: 'https://orynx.space',
			custom: null
		},
		{
			id: 6,
			title: 'WhisprSync',
			description: 'A seamless, platform-agnostic clipboard sync tool. Encrypted. Instant. No strings, just sync.',
			tech: ['Python', 'Svelte', 'Electron', 'Tauri'],
			status: 'in-progress',
			github: null,
			demo: null,
			custom: null,
		},
		{
			id: 5,
			title: 'ennéa',
			description: 'A cycle of nine dark, standalone stories—each a mirror, a myth, a malfunction. It peers into quiet horrors and existential fractures, where time bends and meaning unravels.',
			tech: ['Psy horror', 'Surrealism', 'Philosophical fiction'],
			status: 'in-progress',
			github: null,
			demo: null,
			custom: null,
		}
	];

	// Sort projects by id before rendering
	$: sortedProjects = [...projects].sort((b, a) => a.id - b.id);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						projectsVisible = true;
					}
				});
			},
			{ threshold: 0.2 }
		);

		if (projectsContainer) {
			observer.observe(projectsContainer);
		}

		return () => observer.disconnect();
	});

	function getStatusColor(status: Project['status']) {
		switch (status) {
			case 'active':
				return 'var(--signal-orange)';
			case 'completed':
				return 'var(--ghost-purple)';
			case 'in-progress':
				return 'var(--resonance-red)';
			default:
				return 'var(--text-fog)';
		}
	}
</script>

<div class="projects section-padding" bind:this={projectsContainer}>
	<div class="container">
		<div class="section-header" class:visible={projectsVisible}>
			<h2 class="section-title">
				<span class="section-prefix">></span>
				projects
				<span class="section-suffix">.vault()</span>
			</h2>
			<p class="section-description">
				Fragments from a mind wandering the seams of logic, matter, and meaning.
			</p>
		</div>

		<div class="projects-grid" class:visible={projectsVisible}>
			{#each sortedProjects as project, index}
				<div 
					class="project-card"
					style="animation-delay: {index * 150}ms"
				>
					<div class="project-header">
						<h3 class="project-title">{project.title}</h3>
						<div class="project-status">
							<span 
								class="status-indicator"
								style="background-color: {getStatusColor(project.status as Project['status'])}"
							></span>
							<span class="status-text">{project.status.replace('-', ' ')}</span>
						</div>
					</div>

					<p class="project-description">{project.description}</p>

					<div class="project-tech">
						{#each project.tech as tech}
							<span class="tech-tag">{tech}</span>
						{/each}
					</div>

					<div class="project-links">
						{#if project.github}
							<a href={project.github} class="project-link">
								<span class="link-prefix">></span>
								github
							</a>
						{/if}
						{#if project.demo}
							<a href={project.demo} class="project-link">
								<span class="link-prefix">></span>
								demo
							</a>
						{/if}
						{#if project.custom}
							<a href={(project.custom as CustomLink).link} class="project-link">
								<span class="link-prefix">></span>
								{(project.custom as CustomLink).title}
							</a>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.projects {
		background: var(--void-black);
		min-height: 100vh;
	}

	.section-header {
		text-align: center;
		margin-bottom: 4rem;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s ease;
	}

	.section-header.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.section-title {
		font-size: 2.75rem;
		margin-bottom: 1rem;
		color: var(--white-static);
	}

	.section-prefix {
		color: var(--signal-orange);
		margin-right: 0.5rem;
	}

	.section-suffix {
		color: var(--ghost-purple);
	}

	.section-description {
		font-size: 1.1rem;
		color: var(--text-fog);
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.6;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.projects-grid.visible .project-card {
		animation: fadeInUp 0.8s ease forwards;
	}

	.project-card {
		opacity: 0;
		transform: translateY(30px);
		background: var(--event-horizon);
		border: 1px solid var(--grid-fade);
		padding: 2rem;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.project-card:hover {
		border-color: var(--signal-orange);
		box-shadow: 0 0 30px rgba(255, 71, 26, 0.1);
		transform: translateY(-5px);
	}

	.project-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: var(--signal-orange);
		transform: scaleX(0);
		transition: transform 0.3s ease;
	}

	.project-card:hover::before {
		transform: scaleX(1);
	}

	.project-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.project-title {
		font-size: 1.4rem;
		color: var(--white-static);
		margin: 0;
	}

	.project-status {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
	}

	.status-indicator {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	.status-text {
		color: var(--text-fog);
		font-size: 0.9rem;
		letter-spacing: 0.5px;
	}

	.project-description {
		color: var(--text-fog);
		line-height: 1.6;
		margin-bottom: 1.5rem;
	}

	.project-tech {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.tech-tag {
		background: var(--grid-fade);
		color: var(--resonance-red);
		padding: 0.3rem 0.8rem;
		font-size: 0.85rem;
		border: 1px solid var(--grid-fade);
		transition: all 0.3s ease;
	}

	.tech-tag:hover {
		border-color: var(--resonance-red);
		box-shadow: 0 0 10px rgba(255, 46, 99, 0.2);
	}

	.project-links {
		display: flex;
		gap: 1.5rem;
	}

	.project-link {
		color: var(--white-static);
		text-decoration: none;
		transition: all 0.3s ease;
		font-size: 0.95rem;
	}

	.project-link:hover {
		color: var(--signal-orange);
		text-shadow: 0 0 8px var(--signal-orange);
	}

	.link-prefix {
		margin-right: 0.3rem;
		opacity: 0.7;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.5; }
	}

	@keyframes fadeInUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 768px) {
		.projects-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.section-title {
			font-size: 2.15rem;
		}

		.project-card {
			padding: 1.5rem;
		}

		.project-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}
	}
</style>
