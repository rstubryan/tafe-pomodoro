<script lang="ts" module>
	import { type VariantProps, tv } from 'tailwind-variants';
	import type { Snippet } from 'svelte';

	export const typographyVariants = tv({
		base: 'text-primary',
		variants: {
			variant: {
				default: 'leading-7 [&:not(:first-child)]:mt-6',
				h1: 'text-4xl font-extrabold tracking-tight lg:text-5xl',
				h2: 'text-3xl font-semibold tracking-tight',
				h3: 'text-2xl font-semibold tracking-tight',
				blockquote: 'mt-6 border-l-2 pl-6 italic',
				ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
				table: 'my-6 w-full overflow-y-auto',
				th: 'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
				td: 'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	});

	export type TypographyVariant = VariantProps<typeof typographyVariants>['variant'];

	export interface TypographyProps {
		className?: string;
		children: Snippet;
		variant?: TypographyVariant;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';

	let { className, children, variant = 'default', ...restProps }: TypographyProps = $props();
</script>

<p class={cn(typographyVariants({ variant }), className)} {...restProps}>
	{@render children()}
</p>
