<script>
        import { onMount } from 'svelte';
        import { goto } from '$app/navigation';
        
</script>

<div class="hero">
        <div class="container">
                <div class="hero-content-row">
                        <!-- Avatar -->
                        <div class="avatar-container">
                                <div class="avatar-glow"></div>
                                <div class="avatar-img-wrapper">
                                        <img src="/img.webp" alt="Oryn Vail profile photo, creator of orynx.space" class="avatar-img" />
                                </div>
                        </div>
                        <div class="hero-text">
                                <h1 class="hero-title">
                                        <span class="bracket">{'{'}</span>orynx<span class="bracket">{'}'}</span>
                                </h1>
                                <p class="hero-subtitle">Builder of thoughts, breaker of patterns.<br/>This is just a terminal window into the void.<span class="blink">_</span></p>
                                
                                <div class="hero-actions">
                                        <button class="terminal-button" on:click={() => goto('/projects')}>
                                                &gt; projects
                                        </button>
                                        <button class="terminal-button" on:click={() => goto('/blog')}>
                                                &gt; blog
                                        </button>
                                        <button class="terminal-button" on:click={() => goto('/about')}>
                                                &gt; about
                                        </button>
                                        <button class="terminal-button" on:click={() => goto('/contact')}>
                                                &gt; connect
                                        </button>
                                </div>
                        </div>
                </div>
        </div>
</div>

<style>
        .hero {
                min-height: 100vh;
                display: flex;
                align-items: center;
                padding: 2rem 0;
        }

        .hero-content-row {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 4.75rem;
                width: 100%;
        }

        .avatar-container {
                position: relative;
                width: 15rem;
                height: 15rem;
                display: flex;
                align-items: center;
                justify-content: center;
        }

        .avatar-glow {
                position: absolute;
                inset: 0;
                background: #E86C3F;
                opacity: 0.25;
                border-radius: 50%;
                filter: blur(48px);
                z-index: 0;
        }

        .avatar-img-wrapper {
                width: 15rem;
                height: 15rem;
                border-radius: 50%;
                padding: 2px;
                box-shadow: 0 8px 32px 0 rgba(0,0,0,0.4);
                z-index: 1;
                display: flex;
                align-items: center;
                justify-content: center;
        }

        .avatar-img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
                box-shadow: 0 2px 16px 0 rgba(0,0,0,0.3);
        }

        .hero-text {
                text-align: left;
                width: 100%;
                max-width: 700px;
        }

        .hero-title {
                font-size: 4rem;
                font-weight: 600;
                margin-bottom: 1rem;
                color: var(--white-static);
        }

        .bracket {
                color: var(--signal-orange);
        }

        .hero-subtitle {
                font-size: 1.48rem;
                color: var(--text-fog);
                margin-bottom: 2rem;
                line-height: 1.6;
        }

        .hero-actions {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
                justify-content: flex-start;
                margin-left: -0.5rem;
        }

        .blink {
               animation: blink 1s steps(2, start) infinite;
               }
        
        @keyframes blink {
               0%, 100% { opacity: 1; }
               50% { opacity: 0; }
        }

        .hero .container {
                padding-left: 0;
                padding-right: 0;
        }

        @media (max-width: 1024px) {
                .hero-content-row {
                        flex-direction: column;
                        gap: 2.5rem;
                        text-align: center;
                }
                .hero-text {
                        text-align: center;
                        max-width: 100%;
                }
                .hero-title {
                        font-size: 3rem;
                }
        }

        @media (max-width: 768px) {
                .hero {
                        padding: 1rem 0;
                }
                .hero-title {
                        font-size: 2.5rem;
                }
                .hero-subtitle {
                        font-size: 1rem;
                }
                .hero-actions {
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 1rem;
                        margin-left: 0;
                }
                .hero-actions .terminal-button {
                        width: 100%;
                        max-width: 320px;
                }
                .avatar-container, .avatar-img-wrapper {
                        width: 10rem;
                        height: 10rem;
                }
        }
</style>
