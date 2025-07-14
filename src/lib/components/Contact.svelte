<script lang="ts">
	import { onMount } from 'svelte';

	let contactVisible: boolean = false;
	let contactContainer: HTMLDivElement | null = null;
	let terminalOutput: string[] = [];
	let currentCommand: string = '';
	let showCursor: boolean = true;

	interface SocialLink {
		platform: string;
		url: string;
		icon: string;
	}

	const socialLinks: SocialLink[] = [
		{ platform: 'github', url: 'https://github.com/OrynVail', icon: 'GitHub' },
		{ platform: 'twitter', url: 'https://x.com/MindofOryn', icon: 'Twitter' },
		{ platform: 'email', url: 'mailto:vail@orynx.space', icon: 'Email' }
	];

	const commands: string[] = [
		'> Establishing connection...',
		'> Loading contact protocols...',
		'> Ready for communication',
	];

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						contactVisible = true;
						initializeTerminal();
					}
				});
			},
			{ threshold: 0.2 }
		);

		if (contactContainer) {
			observer.observe(contactContainer);
		}

		return () => observer.disconnect();
	});

	async function initializeTerminal(): Promise<void> {
		for (let i = 0; i < commands.length; i++) {
			await new Promise(resolve => setTimeout(resolve, 500));
			terminalOutput = [...terminalOutput, commands[i]];
		}
	}

	function handleSocialClick(link: SocialLink): void {
		terminalOutput = [...terminalOutput, `$ connect ${link.platform}`, `> Opening ${link.platform}...`];
		setTimeout(() => {
			window.open(link.url, '_blank');
		}, 500);
	}

	function copyEmail(): void {
		const email = 'vail@orynx.space';
		
		// Try modern clipboard API first
		if (navigator.clipboard && window.isSecureContext) {
			navigator.clipboard.writeText(email).then(() => {
				terminalOutput = [...terminalOutput, '$ copy email', '> Email copied to clipboard'];
			}).catch(() => {
				// Fallback for older browsers or when clipboard API fails
				fallbackCopyTextToClipboard(email);
			});
		} else {
			// Fallback for non-secure contexts (like HTTP)
			fallbackCopyTextToClipboard(email);
		}
	}

	function fallbackCopyTextToClipboard(text: string): void {
		const textArea = document.createElement('textarea');
		textArea.value = text;
		textArea.style.position = 'fixed';
		textArea.style.left = '-999999px';
		textArea.style.top = '-999999px';
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		
		try {
			document.execCommand('copy');
			terminalOutput = [...terminalOutput, '$ copy email', '> Email copied to clipboard'];
		} catch (err) {
			console.error('Fallback: Oops, unable to copy', err);
			terminalOutput = [...terminalOutput, '$ copy email', '> Copy failed - please copy manually'];
		}
		
		document.body.removeChild(textArea);
	}

	// sizing and position parameters for icons
	export let iconSize: string = '2rem'; // default smaller size
	export let iconSpacing: string = '2rem'; // more space between icons
</script>

<div class="contact section-padding" bind:this={contactContainer}>
	<div class="container">
		<div class="section-header" class:visible={contactVisible}>
			<h2 class="section-title">
				<span class="section-prefix">></span>
				contact
				<span class="section-suffix">.connect()</span>
			</h2>
		</div>

		<div class="contact-content" class:visible={contactVisible}>
			<div class="contact-grid">
				<div class="terminal-section">
					<div class="terminal-window">
						<div class="terminal-header">
							<div class="terminal-title">contact@oryn:~</div>
						</div>
						
						<div class="terminal-body">
							{#each terminalOutput as output}
								<div class="terminal-line">{output}</div>
							{/each}
							<div class="terminal-line">
								<span class="prompt">$</span>
								<span class="cursor-blink">_</span>
							</div>
						</div>
					</div>
				</div>

				<div class="contact-info">
					<div class="contact-card">
						<h3 class="card-title">
							<span class="card-prefix">[</span>
							Get in Touch
							<span class="card-prefix">]</span>
						</h3>
						
						<p class="contact-text">
							If you must, write. If it matters, I'll read.
						</p>

						<div class="contact-methods">
							<div class="method-group">
								<button class="contact-button email" on:click={copyEmail}>
									<span class="method-icon">&gt;</span>
									vail@orynx.space
									<span class="copy-hint">click to copy</span>
								</button>
							</div>

							<div class="method-group">
								<div class="social-links horizontal" style="justify-content: center; gap: {iconSpacing};">
									{#each socialLinks.slice(0, 3) as link, i}
										<button 
											class="social-link"
											on:click={() => handleSocialClick(link)}
											aria-label={link.platform}
										>
											{#if link.platform === 'github'}
												<svg class="social-icon" viewBox="0 0 24 24" fill="#a09690" style="width: {iconSize}; height: {iconSize};">
													<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
												</svg>
											{:else if link.platform === 'twitter'}
												<svg class="social-icon" viewBox="0 0 24 24" fill="#a09690" style="width: {iconSize}; height: {iconSize};">
													<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
												</svg>
											{:else if link.platform === 'email'}
												<svg class="social-icon" viewBox="0 0 24 24" fill="none" stroke="#a09690" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: {iconSize}; height: {iconSize};">
													<rect width="20" height="16" x="2" y="4" rx="2"/>
													<path d="m22 7-10 5L2 7"/>
												</svg>
											{/if}
										</button>
									{/each}
								</div>
							</div>
						</div>

						<div class="availability">
							<div class="status-indicator">
								<span class="status-dot"></span>
								<span class="status-text">Accepting temporal anomalies.</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.contact {
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

	.contact-content {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s ease 0.2s;
	}

	.contact-content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		margin-bottom: 4rem;
		align-items: start;
	}

	.terminal-section {
		display: flex;
		justify-content: center;
	}

	.terminal-window {
		background: var(--event-horizon);
		border: 1px solid var(--grid-fade);
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
		width: 100%;
		max-width: 500px;
	}

	.terminal-header {
		background: var(--grid-fade);
		padding: 0.8rem 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.terminal-title {
		color: var(--text-fog);
		font-size: 0.95rem;
	}

	.terminal-body {
		padding: 1.5rem;
		min-height: 300px;
		font-size: 0.95rem;
		line-height: 1.8;
		color: var(--text-fog);
	}

	.terminal-line {
		margin-bottom: 0.5rem;
		color: var(--signal-orange);
	}

	.prompt {
		color: var(--signal-orange);
		margin-right: 0.5rem;
	}

	.cursor-blink {
		animation: blink 1s infinite;
		color: var(--signal-orange);
	}

	.contact-info {
		display: flex;
		flex-direction: column;
	}

	.contact-card {
		background: var(--event-horizon);
		border: 1px solid var(--grid-fade);
		padding: 2rem;
		border-radius: 4px;
	}

	.card-title {
		font-size: 1.5rem;
		color: var(--white-static);
		margin-bottom: 1.5rem;
	}

	.card-prefix {
		color: var(--signal-orange);
	}

	.contact-text {
		color: var(--text-fog);
		line-height: 1.6;
		margin-bottom: 2rem;
		font-size: 1.02rem;
	}

	.contact-methods {
		margin-bottom: 2rem;
	}

	.method-group {
		margin-bottom: 2rem;
	}

	.contact-button {
		background: transparent;
		border: 1px solid var(--signal-orange);
		color: var(--signal-orange);
		padding: 1rem 1.5rem;
		font-family: inherit;
		font-size: 1.02rem;
		cursor: pointer;
		transition: all 0.3s ease;
		width: 100%;
		text-align: left;
		position: relative;
		overflow: hidden;
	}

	.contact-button:hover {
		background: var(--signal-orange);
		color: var(--white-static);
		box-shadow: 0 0 20px var(--signal-orange);
	}

	.method-icon {
		margin-right: 0.8rem;
		font-weight: bold;
	}

	.copy-hint {
		float: right;
		font-size: 0.8rem;
		opacity: 0.7;
	}

	.social-links {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.social-links.horizontal {
		flex-direction: row;
		justify-content: flex-start;
		gap: var(--icon-spacing, 2rem);
	}

	.social-link {
		background: none;
		border: none;
		color: var(--text-gray);
		font-family: inherit;
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.3s ease;
		padding: 0.5rem 0;
		text-align: left;
		display: flex;
		align-items: flex-start;
    }

    .social-link:hover {
	    color: var(--entropy-gold);
    }

    .social-link:hover .social-icon {
	    filter: drop-shadow(0 0 8px var(--entropy-gold));
    }

	.social-icon {
		width: var(--icon-size, 1.5rem);
		height: var(--icon-size, 1.5rem);
		display: block;
	}

	.availability {
		border-top: 1px solid var(--grid-fade);
		padding-top: 1.5rem;
	}

	.status-indicator {
		display: flex;
		align-items: center;
		gap: 0.8rem;
	}

	.status-dot {
		width: 8px;
		height: 8px;
		background: var(--entropy-gold);
		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	.status-text {
		color: var(--text-fog);
		
		font-size: 0.9rem;
	}

	@keyframes blink {
		0%, 50% { opacity: 1; }
		51%, 100% { opacity: 0; }
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.5; }
	}

	@media (max-width: 1024px) {
		.contact-grid {
			grid-template-columns: 1fr;
			gap: 3rem;
		}
	}

	@media (max-width: 768px) {
		.section-title {
			font-size: 2.1rem;
		}

		.contact-card {
			padding: 1.5rem;
		}

		.terminal-body {
			font-size: 0.8rem;
			padding: 1rem;
		}

		.contact-button {
			padding: 0.8rem 1rem;
		}

		/* Hide terminal on mobile */
		.terminal-section {
			display: none;
		}

		/* Adjust grid for mobile - make contact info full width */
		.contact-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
</style>
