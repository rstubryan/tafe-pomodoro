<script lang="ts">
	import ContainerLayout from '$lib/components/templates/container-layout.svelte';

	let { children } = $props();
</script>

<ContainerLayout>
	{@render children?.()}
</ContainerLayout>
