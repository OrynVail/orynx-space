<script lang="ts">
  import { onMount } from 'svelte';
  import BlogPostLayout from '$lib/blogs/BlogPostLayout.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  const post = data.post as { slug: string; title?: string; date?: string; description?: string; tags?: string[]; coverImage?: string };

  let PostComponent: any = null;

  onMount(async () => {
    const module = await import(`../../../lib/blogs/posts/${post.slug}.md`);
    PostComponent = module.default;
  });
</script>

<svelte:head>
  <title>{post.title} – orynx</title>
  <meta name="description" content={post.description} />
  <link rel="canonical" href={`https://orynx.space/blog/${post.slug.replace(/\s+/g, '-').toLowerCase()}`} />
  <meta property="og:title" content={`${post.title} – orynx`} />
  <meta property="og:description" content={post.description} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={`https://orynx.space/blog/${post.slug.replace(/\s+/g, '-').toLowerCase()}`} />
  <meta property="og:image" content="https://orynx.space/img.webp" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`${post.title} – orynx`} />
  <meta name="twitter:description" content={post.description} />
  <meta name="twitter:image" content="https://orynx.space/img.webp" />
</svelte:head>

{#if PostComponent}
  <div class="blog-slug-content">
    <BlogPostLayout frontmatter={post}>
      <svelte:component this={PostComponent} />
    </BlogPostLayout>
  </div>
{:else}
  <p>Loading...</p>
{/if}

<style>
.blog-slug-content {
  position: relative;
  z-index: 1;
}
</style> 