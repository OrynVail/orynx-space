<script>
	import { onMount } from 'svelte';

	let canvas;
	let ctx;
	let animationFrame;

	onMount(() => {
		ctx = canvas.getContext('2d');
		resizeCanvas();
		drawGrid();

		window.addEventListener('resize', resizeCanvas);

		return () => {
			window.removeEventListener('resize', resizeCanvas);
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
		};
	});

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		drawGrid();
	}

	function drawGrid() {
		if (!ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		const gridSize = 32;
		const opacity = 0.12;
		
		// Set grid line style
		ctx.strokeStyle = `rgba(64, 64, 64, ${opacity})`;
		ctx.lineWidth = 1;
		
		// Draw vertical lines
		for (let x = 0; x <= canvas.width; x += gridSize) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, canvas.height);
			ctx.stroke();
		}
		
		// Draw horizontal lines
		for (let y = 0; y <= canvas.height; y += gridSize) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(canvas.width, y);
			ctx.stroke();
		}
		
		// Draw vignette effect
		const gradient = ctx.createRadialGradient(
			canvas.width / 2, canvas.height / 2, 0,
			canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
		);
		
		gradient.addColorStop(0, 'rgba(10, 10, 10, 0)');
		gradient.addColorStop(0.7, 'rgba(10, 10, 10, 0.3)');
		gradient.addColorStop(1, 'rgba(10, 10, 10, 0.8)');
		
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
</script>

<canvas 
	bind:this={canvas}
	class="grid-background"
></canvas>

<style>
	.grid-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 0;
		pointer-events: none;
	}
</style>
