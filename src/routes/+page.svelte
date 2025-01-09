<script>
	import Typography from '$lib/components/atoms/Typography/typography.svelte';
	import { Button } from '$lib/components/ui/button';
</script>

<Typography variant="h3">Welcome to SvelteKit</Typography>
<div class="flex gap-2">
	<a href="login">
		<Button>Login</Button>
	</a>
	<a href="register">
		<Button>Register</Button>
	</a>
</div>
