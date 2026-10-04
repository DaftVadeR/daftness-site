import { twMerge } from "tailwind-merge";

export const logoStyle = twMerge(`
   object-contain h-28 w-28 md:h-36 md:w-36 block bg-black/5 p-4 hover:bg-[#22224466] transition-all duration-500
`);

export const logoListItemStyle = twMerge(`
   inline-flex mb-4 md:mb-6 basis-1/2 md:basis-auto mr-0 md:mr-4 justify-center items-center 
`);

export const logoListStyle = twMerge(`
   flex flex-row flex-wrap align-middle mb-10 md:mb-12 md:justify-left md:align-left md:items-left -mx-6
`);
