import { twMerge } from "tailwind-merge";

// width will change via an inline style.
export const listStyle = twMerge(`
   before:content-[''] before:block before:bg-purple-700 before:rounded before:w-0 before:h-1 before:transtion-all before:duration-800 before:translate-y-0
   before:absolute before:left-0 before:bottom-3 before:z-3 before:pointer-events-none inline-flex mt-0 mb-24 md:mt-20 md:mb-12 relative bg-white
   pt-4 pb-4 sm:px-4 border rounded-3xl flex-nowrap flex-row justify-center items-center 
`);

export const listItemStyle = twMerge(`
   rounded-[inherit] min-h-full h-full flex-grow flex-shrink-0
`);

export const linkStyle = twMerge(
	`mx-3 sm:mx-4 text-xl md:text-2xl hover:text-purple-700 text-black transition-all duration-500 relative z-2`,
);

// rgba(120, 30, 200, 0.8) 0 %,
// rgba(40, 10, 100, 0.8) 40 %,
