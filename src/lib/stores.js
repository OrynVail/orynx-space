import { writable } from 'svelte/store';

export const currentSection = writable('home');
export const isMenuOpen = writable(false);
export const terminalText = writable('');
export const isTyping = writable(false);
