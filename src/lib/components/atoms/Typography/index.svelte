<script lang="ts">
	import type { Snippet } from 'svelte'

	interface TypographyProps {
		className?: string;
		children: Snippet;
	}

	let { className, children }: TypographyProps = $props();
</script>

<h2
	class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 {className}"
>
	{@render children()}
</h2>
