/**
 * Utility function for typewriter effect
 */
export function typewriter(element, { text, speed = 50, delay = 0 }) {
	return {
		duration: text.length * speed + delay,
		tick: (t) => {
			const i = Math.trunc(text.length * t);
			element.textContent = text.slice(0, i);
		}
	};
}

/**
 * Smooth scroll to element
 */
export function scrollToElement(elementId) {
	const element = document.getElementById(elementId);
	if (element) {
		element.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	}
}

/**
 * Generate random string for terminal effects
 */
export function generateRandomString(length) {
	const chars = '0123456789abcdef';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}

/**
 * Format date for terminal display
 */
export function formatTerminalDate(date = new Date()) {
	return date.toISOString().split('T')[0];
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}
