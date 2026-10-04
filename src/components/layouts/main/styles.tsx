import { twMerge } from "tailwind-merge";

export const containerStyle = twMerge(`
    min-h-dvh flex flex-col items-center relative
`);

export const contentStyle = twMerge(`
    w-full px-5 lg:px-20 text-center flex-grow
`);

export const headerStyle = twMerge(`
    flex-none w-full
`);

export const layoutContentWrapperStyle = twMerge(`
   z-1 relative
`);

export const footerStyle = twMerge(`
    flex-none w-full text-center 
`);

export const circleContentStyle = twMerge(`
	text-white z-2 relative text-center
`);

export const contentWrapperStyle = twMerge(`
	max-w-[1920px] mx-auto relative 
`);

export const layoutContainerStyle = twMerge(`
    bg-black text-white text-center
`);

export const circleContainerStyle = twMerge(`
    h-full w-full absolute top-0 right-0 bottom-0 left-0 overflow-hidden z-0 
`);

export const circleRowStyle = twMerge(`
    absolute left-0 right-0 flex w-full
`);

export const circleStyle = twMerge(`
    absolute block  rounded-full blur-[200px] transform: translate-x-[0px] translate-y-[0px] translate-z-[0px] will-change-[filter]
	content-[""] opacity-15
`);

export const col1Style = twMerge(`
    bg-purple-800
`);

export const col2Style = twMerge(`
    bg-orange-300
`);
