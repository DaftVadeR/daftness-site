import { twMerge } from "tailwind-merge";

export const titleStyle = twMerge(`
   mb-12 text-3xl sm:text-4xl md:text-6xl lg:text-6xl
`);

export const subTitleStyle = twMerge(`
   mb-12 text-2xl sm:text-3xl md:text-4xl leading-8 md:leading-12
`);

export const smallTitleStyle = twMerge(`
   mb-8 text-xl sm:text-2xl md:text-3xl lg:text-3xl
`);

export const paragraphStyle = twMerge(`
   text-lg sm:text-xl md:text-2xl leading-8 md:leading-10 mb-8
`);

export const smallParagraphStyle = twMerge(`
   text-md sm:text-lg md:text-xl leading-8 mb-8
`);

export const containerStyle = twMerge(`
  
`);

export const splitterStyle = twMerge(`
   lg:flex lg:flex-row lg:space-x-16 text-left 
`);
