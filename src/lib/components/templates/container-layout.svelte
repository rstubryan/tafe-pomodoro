<script lang="ts">
	import { cn } from '$lib/utils';

	let { children, className = '', ...restProps } = $props();
</script>

<div class={cn('', className)} {...restProps}>
	{@render children?.()}
</div>
