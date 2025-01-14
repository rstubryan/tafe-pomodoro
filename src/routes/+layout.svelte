<script lang="ts">
	import '$/app.css';
	import ContainerLayout from '$lib/components/templates/container-layout.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import Navbar from '$lib/components/molecules/Navbar/navbar.svelte';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<ContainerLayout>
	<ModeWatcher />
	{#if page.url.pathname !== '/login' && page.url.pathname !== '/register'}
		<Navbar />
	{/if}

	{@render children()}
</ContainerLayout>
