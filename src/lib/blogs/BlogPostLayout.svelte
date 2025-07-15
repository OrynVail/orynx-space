<script>
  export let frontmatter;
</script>

<article class="blog-post">
  <header class="blog-header">
    <h1 class="title">{frontmatter.title}</h1>
    <p class="meta">Published on {frontmatter.date}</p>
  </header>
  <section class="content">
    <slot />
  </section>
</article>

<style>
  /* General blog post container */
  .blog-post {
    max-width: 800px; 
    margin: 4rem auto; 
    padding: 2rem;
    color: var(--white-static);
    font-family: 'Space Mono', monospace;
  }

  /* Blog post header */
  .blog-header {
    text-align: center; 
    margin-bottom: 3rem;
  }

  .title {
    font-size: 3rem; 
    margin-bottom: 1rem;
    color: var(--entropy-gold);
    letter-spacing: -1px;
    line-height: 1.2;
  }

  .meta {
    font-size: 1.05rem;
    color: var(--text-fog);
    margin-bottom: 2rem;
  }

  /* Main content section */
  .content {
    line-height: 1.8; 
    font-size: 1.1rem; 
    color: var(--white-static);
  }

  /* Styling for headings */
  .content :global(h1),
  .content :global(h2),
  .content :global(h3) {
    font-weight: 600;
    color: var(--white-static);
    margin-top: 2.5rem;
    margin-bottom: 1.5rem;
    line-height: 1.4;
  }

  .content :global(h1) {
    font-size: 2rem;
    border-bottom: 2px solid var(--grid-fade);
    padding-bottom: 0.5rem;
  }

  .content :global(h2) {
    font-size: 1.75rem;
  }

  .content :global(h3) {
    font-size: 1.4rem;
    font-style: italic;
  }

  /* Styling for paragraphs */
  .content :global(p) {
    margin-bottom: 1.4rem;
    font-family: Space Grotesk;
    font-size: 1.15rem;
    color: var(--text-fog)
  }

  /* Styling for links */
  .content :global(a) {
    color: var(--resonance-red);
    text-decoration: none;
    border-bottom: 2px solid var(--resonance-red);
    transition: all 0.3s ease;
  }

  .content :global(a:hover) {
    color: var(--signal-orange);
    border-bottom-color: var(--signal-orange);
    background-color: rgba(255, 165, 0, 0.15); 
  }

  /* Styling for inline code */
  .content :global(code) {
    background-color: var(--event-horizon);
    color: rgba(255, 71, 26, 1); 
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 1.1rem;
  }

  /* Styling for blockquote */
  .content :global(blockquote) {
    margin-left: 0.5rem;
    margin-top: 2.5rem;
    padding-left: 1.5rem;
    border-left: 3px solid var(--resonance-red);
    /* text-shadow: 0 0 1px var(--resonance-red); */
    font-style: italic;
    color: var(--text-fog);
    margin-bottom: 2rem;
  }

  /* Styling for code blocks */
  .content :global(pre) {
    background-color: rgba(19, 11, 10, 0.5); 
    padding: 2rem;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(57, 17, 0, 0.4);
    overflow-x: auto;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 2.5rem;
    border: 1px solid var(--grid-fade);
    border-left: 4px solid var(--ghost-purple);
  }

  /* Ensure the code inside pre tags doesn't get the inline code styling */
  .content :global(pre code) {
    background-color: transparent;
    padding: 0;
    border-radius: 0;
  }
</style>
