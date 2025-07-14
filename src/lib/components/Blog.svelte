<script lang="ts">
  import { getAllPosts } from '$lib/blogs/posts.js';
  import { onMount } from 'svelte';

  let posts = getAllPosts();
  let blogVisible = false;
  let blogContainer: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            blogVisible = true;
          }
        });
      },
      { threshold: 0.2 }
    );
    if (blogContainer) {
      observer.observe(blogContainer);
    }
    return () => observer.disconnect();
  });
</script>

<div class="blog section-padding" bind:this={blogContainer}>
  <div class="container">
    <div class="section-header" class:visible={blogVisible}>
      <h2 class="section-title">
        <span class="section-prefix">&gt;</span>
        blog
        <span class="section-suffix">.index()</span>
      </h2>
      <p class="section-description">
        Thoughts that refused to die.
      </p>
    </div>

    <div class="blog-grid" class:visible={blogVisible}>
      {#each posts as post, index}
        <a 
          class="blog-card"
          style="animation-delay: {index * 150}ms"
          href={`/blog/${post.slug}`}
        >
          <div class="blog-card-inner">
            <div class="blog-date-col">
              <span class="blog-date blog-date-desktop">[{post.date}]</span>
            </div>
            <div class="blog-content-col">
              <h3 class="blog-title">{post.title}</h3>
              <span class="blog-date blog-date-mobile">[{post.date}]</span>
              <p class="blog-description">{post.description}</p>
              {#if post.tags && post.tags.length}
                <div class="blog-tags">
                  {#each post.tags as tag}
                    <span class="tag">{tag}</span>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>

<style>
.blog {
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
.blog-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
}
.blog-grid.visible .blog-card {
  animation: fadeInUp 0.8s ease forwards;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.blog-card {
  max-width: 850px;
  width: 100%;
  margin: 0 auto;
  display: block;
  opacity: 0;
  transform: translateY(30px);
  background: var(--event-horizon);
  border: 1px solid var(--grid-fade);
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  text-shadow: none;
}
.blog-card:hover {
  border-color: var(--signal-orange);
  box-shadow: 0 0 30px rgba(255, 71, 26, 0.2);
  transform: translateY(-5px);
}
.blog-card::before {
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
.blog-card:hover::before {
  transform: scaleX(1);
}
.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}
.blog-title {
  font-size: 1.5rem;
  color: var(--white-static);
  margin: 0 0 0.5rem 0;
}
.blog-date {
  color: var(--text-fog);
  font-size: 1.15rem;
  white-space: nowrap;
  margin-right: 1.4rem;
}
.blog-description {
  color: var(--text-fog);
  margin: 0 0 1.2rem 0;
  font-family: Space Grotesk;
  font-size: 1.1rem;
}
.blog-tags {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}
.tag {
  background: var(--grid-fade);
  color: var(--resonance-red);
  padding: 0.3rem 0.8rem;
  font-size: 0.9rem;
  border: 1px solid var(--grid-fade);
  transition: all 0.3s ease;
}
.tag:hover {
  border-color: var(--resonance-red);
  box-shadow: 0 0 10px rgba(255, 46, 99, 0.2);
}
.blog-card-inner {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2rem;
}
.blog-date-col {
  min-width: 110px;
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 2px;
}
.blog-date {
  color: var(--text-fog);
  font-size: 0.95rem;
  white-space: nowrap;
}
.blog-content-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.blog-date-mobile {
  display: none;
}
.blog-date-desktop {
  display: inline;
}

@media (max-width: 600px) {
  .blog-card-inner {
    flex-direction: column;
    gap: 0.5rem;
  }
  .blog-date-col {
    min-width: 0;
    padding-top: 0;
    order: 2;
    justify-content: flex-start;
    display: none;
  }
  .blog-content-col {
    order: 1;
  }
  .blog-date {
    margin-top: 0.5rem;
    margin-bottom: 0;
    white-space: normal;
  }
  .blog-date-mobile {
    display: block;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    white-space: normal;
    color: var(--ghost-purple);
  }
  .blog-date-desktop {
    display: none;
  }
}
</style> 