<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { page } from '$app/state';
	import { navLinks } from './navlist';

	let { ...restProps } = $props();
</script>

<nav class={cn('flex w-full items-center justify-between')} {...restProps}>
	<ul class="flex items-center space-x-4">
		{#each navLinks as { name, href }}
			<li>
				<a {href} class={cn('text-black', { underline: page.url.pathname === href })}>
					{name}
				</a>
			</li>
		{/each}
	</ul>
</nav>
