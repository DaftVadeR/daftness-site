import { twMerge } from "tailwind-merge";

export const containerStyle = twMerge(`
   py-30 relative z-1
`);

export const containerInnerStyle = twMerge(`
   absolute top-0 left-0 w-full h-full
`);

// takes away the need for mono, by always being at max width
export const characterWrapperStyle = twMerge(`
   flex items-center justify-center w-6 h-8
`);

export const characterStyle = twMerge(`
   text-green-400 block text-md font-sans
`);

export const triggersContainerStyle = twMerge(`
   absolute top-0 left-0 w-full h-full flex flex-wrap
`);

export const triggerStyle = twMerge(`
   absolute top-0 left-0 flex flex-col items-center justify-center
`);

export const rowStyle = twMerge(`
   flex 
`);
