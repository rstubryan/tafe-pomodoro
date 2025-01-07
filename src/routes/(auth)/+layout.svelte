<script lang="ts">
	import QueryClientContainer from '$lib/components/templates/QueryClientContainer.svelte';
</script>

<QueryClientContainer>
	<main class="mx-auto grid min-h-screen max-w-xl items-center">
		<slot />
	</main>
</QueryClientContainer>
