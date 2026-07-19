<script lang="ts">
	import '$lib/styles/document.css';
	import '$lib/styles/poetry.css';

	interface DocumentFrontmatter {
		title?: string;
		date?: string;
		type?: string;
		layout?: string;
		tags?: string[];
		[key: string]: any;
	}

	export let frontmatter: DocumentFrontmatter;

	// Determine if this is a poetry layout
	$: isPoetry = frontmatter.type === 'poem' || frontmatter.layout === 'poetry';
</script>

<article class="document" class:poetry={isPoetry}>
	<header class="document-header">
		{#if frontmatter.title}
			<h1 class="document-title">{frontmatter.title}</h1>
		{/if}
		{#if frontmatter.date}
			<p class="document-meta">Published on {frontmatter.date}</p>
		{/if}
	</header>
	<section class="document-content">
		<slot />
	</section>
	<footer class="document-footer">
		<p class="document-copyright">© 2026 Oryn Vail. All rights reserved.</p>
	</footer>
</article>


