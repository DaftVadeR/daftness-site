import { twMerge } from "tailwind-merge";

export const containerStyle = twMerge(`
   rounded-xl relative p-0.5 mb-20 background-black bg-black
`);

export const innerContainerStyle = twMerge(`
   rounded-[inherit] background-black bg-black min-h-full h-full z-2 overflow-hidden
`);

export const leanStyle = twMerge(`p-0 md:p-0`);
export const smStyle = twMerge(`md:p-10 p-5`);
export const mdStyle = twMerge(`md:p-20 p-10`);
export const lgStyle = twMerge(`md:p-40 p-10`);

export const scrollBtnStyle = twMerge(
	`absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-white/70 italic`,
);
export const arrowStyle = twMerge(`animate-bounce`);
