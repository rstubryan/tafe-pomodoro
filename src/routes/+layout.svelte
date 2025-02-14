<script lang="ts">
	import '$/app.css';
	import ContainerLayout from '$lib/components/templates/container-layout.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner/index.js';

	let { children } = $props();
</script>

<ContainerLayout>
	<ModeWatcher />
	<Toaster />

	{@render children()}
</ContainerLayout>
