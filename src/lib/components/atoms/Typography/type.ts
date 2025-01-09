import { type VariantProps } from 'tailwind-variants';
import type { Snippet } from 'svelte';
import { typographyVariants } from './typography.svelte';

export type TypographyVariant = VariantProps<typeof typographyVariants>['variant'];

export type TypographySize = VariantProps<typeof typographyVariants>['size'];

export type TypographyMarginTop =
	| VariantProps<typeof typographyVariants>['marginTop']
	| boolean
	| string;

export type TypographyScrollMargin =
	| VariantProps<typeof typographyVariants>['scrollMargin']
	| boolean
	| string;

export interface TypographyProps {
	className?: string;
	children: Snippet;
	variant?: TypographyVariant;
	size?: TypographySize;
	marginTop?: TypographyMarginTop;
	scrollMargin?: TypographyScrollMargin;
}
