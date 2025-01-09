<script lang="ts">
	import '$/app.css';
	import Container from '$lib/components/templates/container-layout.svelte';

	let { children } = $props();
</script>

<Container>
	{@render children()}
</Container>
