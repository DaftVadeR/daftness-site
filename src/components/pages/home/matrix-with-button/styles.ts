import { twMerge } from "tailwind-merge";

export const showMatrixBtnStyle = twMerge(`
   bg-white rounded-lg md:rounded-full px-4 md:px-6 py-4 text-md md:text-lg hover:bg-gray-200 transition text-black hover:text-purple-800 cursor-pointer hover:scale-105 scale:100 transition-all duration-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-2 absolute
`);

export const btnContainerStyle = twMerge(`
   w-full text-center h-60 relative
`);

export const titleStyle = twMerge(`
   absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center py-4 px-6 z-2 bg-white rounded-lg md:rounded-lg text-black animate-fade-in
`);

export const containerStyle = twMerge(`
   p-0
`);
