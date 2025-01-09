<script lang="ts" module>
	import { tv } from 'tailwind-variants';
	import type { TypographyProps } from './type';

	export const typographyVariants = tv({
		base: 'text-primary',
		variants: {
			variant: {
				default: 'text-primary',
				secondary: 'text-secondary',
				destructive: 'text-destructive'
			},
			size: {
				default: 'leading-7',
				h1: 'text-4xl font-extrabold tracking-tight lg:text-5xl',
				h2: 'text-3xl font-semibold tracking-tight',
				h3: 'text-2xl font-semibold tracking-tight',
				blockquote: 'mt-6 border-l-2 pl-6 italic',
				ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
				table: 'my-6 w-full overflow-y-auto',
				th: 'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
				td: 'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right'
			},
			marginTop: {
				true: '[&:not(:first-child)]:mt-6',
				false: ''
			},
			scrollMargin: {
				true: 'scroll-m-20',
				false: ''
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
			marginTop: false,
			scrollMargin: true
		}
	});
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';

	let {
		className,
		children,
		variant = 'default',
		size = 'default',
		marginTop = false,
		scrollMargin = true,
		...restProps
	}: TypographyProps = $props();

	export const marginTopClass = typeof marginTop === 'boolean' ? marginTop : marginTop === 'true';
	export const scrollMarginClass =
		typeof scrollMargin === 'boolean' ? scrollMargin : scrollMargin === 'true';
</script>

<p
	class={cn(
		typographyVariants({
			variant,
			size,
			marginTop: marginTopClass,
			scrollMargin: scrollMarginClass
		}),
		className
	)}
	{...restProps}
>
	{@render children()}
</p>
