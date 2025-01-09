<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { useLogout } from '$lib/hooks/useLogout';

	function handleLogout() {
		useLogout()();
	}
</script>

<div class="flex justify-between">
	<h1>Protected Dashboard</h1>
	<Button onclick={handleLogout}>Logout</Button>
</div>
