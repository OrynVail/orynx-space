<script>
	import { onMount } from 'svelte';

	let aboutVisible = false;
	let aboutContainer;

	const timeline = [
		{ year: '2025', event: 'Emergence Protocol', description: 'The void became writable.' },
	];

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						aboutVisible = true;
					}
				});
			},
			{ threshold: 0.2 }
		);

		if (aboutContainer) {
			observer.observe(aboutContainer);
		}

		return () => observer.disconnect();
	});
</script>

<div class="about section-padding" bind:this={aboutContainer}>
	<div class="container">
		<div class="section-header" class:visible={aboutVisible}>
			<h2 class="section-title">
				<span class="section-prefix">></span>
				about
				<span class="section-suffix">.self()</span>
			</h2>
		</div>

		<div class="about-content" class:visible={aboutVisible}>
			<div class="about-text">
				<div class="terminal-block">
					<div class="code-content">
						<p class="code-line">
							<span class="keyword">const</span> 
							<span class="variable">oryn</span> 
							<span class="operator">=</span> 
							<span class="bracket">{'{'}</span>
						</p>
						<p class="code-line indent">
							<span class="property">operatingMode</span><span class="operator">:</span> 
							<span class="string">"Autonomous | Asymmetric | Always Watching"</span><span class="operator">,</span>
						</p>
						<p class="code-line indent">
							<span class="property">focus</span><span class="operator">:</span> 
							<span class="string">["Science", "Philosophy", "Code", "Entropy"]</span><span class="operator">,</span>
						</p>
						<p class="code-line indent">
							<span class="property">philosophy</span><span class="operator">:</span> 
							<span class="string">"Entropy is the default state. All else is architecture."</span><span class="operator">,</span>
						</p>
						<p class="code-line indent">
							<span class="property">currentProjects</span><span class="operator">:</span> 
							<span class="array">["Solis", "Helios", "ennéa", "WhisprSync"]</span><span class="operator">,</span>
						</p>
						<p class="code-line indent">
							<span class="property">warning</span><span class="operator">:</span> 
							<span class="string">"Not optimised for social protocol. Runs better in silence."</span>
						</p>

						<p class="code-line">
							<span class="bracket">{'}'}</span><span class="operator">;</span>
						</p>
					</div>
				</div>

				<div class="description">
					<p>
						I work in three languages: ink on skin, words on page, code in machine. Each one a different grammar for the same restless mind, one that refuses the comfort of categories. I’ve worn many masks — but titles collapse under weight. I'd rather be everything at once than shrink to something explainable.
					</p>
					<p>
						Just a rogue system becoming sentient. From skin to code. From wars to words. One mind. Many masks. No leash.
					</p>
				</div>
			</div>

			<div class="timeline-section">
				<h3 class="subsection-title">
					<span class="prefix">$</span> git log --oneline
				</h3>
				<div class="timeline">
					{#each timeline as item, index}
						<div 
							class="timeline-item"
							style="animation-delay: {index * 150}ms"
						>
							<div class="timeline-year">{item.year}</div>
							<div class="timeline-content">
								<h4 class="timeline-event">{item.event}</h4>
								<p class="timeline-description">{item.description}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.about {
		/* background: var(--void-black); */
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

	.about-content {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s ease 0.2s;
	}

	.about-content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.about-text {
		margin-bottom: 4rem;
	}

	.terminal-block {
		background: var(--event-horizon);
		border: 1px solid var(--grid-fade);
		border-radius: 4px;
		padding: 1.5rem;
		margin-bottom: 2rem;
		font-family: 'Space Mono', monospace;
	}

	.code-content {
		line-height: 1.8;
	}

	.code-line {
		margin: 0.3rem 0;
	}

	.indent {
		padding-left: 2rem;
	}

	.keyword {
		color: var(--resonance-red);
	}

	.variable {
		color: var(--white-static);
	}

	.operator {
		color: var(--signal-orange);
	}

	.property {
		color: var(--ghost-purple);
	}

	.string {
		color: #ffa500;
	}

	.array {
		color: #ff6b6b;
	}

	.bracket {
		color: var(--text-gray);
	}

	.description {
		color: var(--text-fog);
		font-family: Space Grotesk;
		line-height: 1.7;
		font-size: 1.2rem;
	}

	.description p {
		margin-bottom: 1rem;
	}

	.subsection-title {
		color: var(--signal-orange);
		font-size: 1.4rem;
		margin-bottom: 2rem;
		font-weight: 500;
	}

	.prefix {
		color: var(--resonance-red);
		margin-right: 0.5rem;
	}

	.timeline-section {
		margin-bottom: 2rem;
	}

	.timeline {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.about-content.visible .timeline-item {
		animation: fadeInUp 0.6s ease forwards;
	}

	.timeline-item {
		display: flex;
		gap: 2rem;
		opacity: 0;
		transform: translateY(20px);
		padding: 1.5rem;
		background: var(--event-horizon);
		border: 1px solid var(--grid-fade);
		border-left: 3px solid var(--ghost-purple);
		transition: all 0.3s ease;
	}

	.timeline-item:hover {
		border-left-color: var(--resonance-red);
		box-shadow: 0 0 30px rgba(255, 71, 26, 0.1);
	}

	.timeline-year {
		color: var(--signal-orange);
		font-weight: 600;
		font-size: 1.2rem;
		min-width: 60px;
	}

	.timeline-content {
		flex: 1;
	}

	.timeline-event {
		color: var(--white-static);
		font-size: 1.2rem;
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	.timeline-description {
		color: var(--text-fog);
		line-height: 1.6;
	}

	@keyframes fadeInUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 768px) {
		.section-title {
			font-size: 2.45rem;
		}

		.timeline-item {
			flex-direction: column;
			gap: 1rem;
		}

		.timeline-year {
			min-width: auto;
		}

		.terminal-block {
			font-size: 1rem;
		}

		.indent {
			padding-left: 1rem;
		}
	}
</style>
