import { twMerge } from "tailwind-merge";

export const containerStyle = twMerge(`text-left`);
export const logosListStyle = twMerge(
	`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4`,
);
export const logoItemStyle = twMerge(`flex items-center justify-center p-4`);
export const logoImageStyle = twMerge(`block max-h-full max-w-full`);
