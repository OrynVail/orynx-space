<script>
	export let blinking = true;
	export let color = 'var(--signal-orange)';
</script>

<span 
	class="terminal-cursor" 
	class:blinking
	style="background-color: {color};"
></span>

<style>
	.terminal-cursor {
		display: inline-block;
		width: 2px;
		height: 1.2em;
		margin-left: 2px;
		vertical-align: text-bottom;
	}

	.blinking {
		animation: blink 1s infinite;
	}

	@keyframes blink {
		0%, 50% { opacity: 1; }
		51%, 100% { opacity: 0; }
	}
</style>
