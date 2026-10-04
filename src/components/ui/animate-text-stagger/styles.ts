import { twMerge } from "tailwind-merge";

export const characterStyle = twMerge(
	"opacity-0 scale-50 inline-block invisible align-middle",
);

export const iconStyle = twMerge(
	"left-0 top-0 absolute animate-pulse block md:block lg:hidden xl:block",
);

export const iconPaddingStyle = twMerge(
	"pt-1.5 md:pt-0 lg:pt-0 pl-14 sm:pl-14 md:pl-14 lg:pl-0 xl:pl-14 relative",
);

export const wordStyle = twMerge("inline-block whitespace-pre");

export const cursorStyle = twMerge(
	"animate-pulse absolute left-0 top-0 transition-transform duration-100",
);

export const lineContainerStyle = twMerge("block relative");

export const containerStyle = twMerge("");

export const lineStyle = twMerge("block whitespace-normal");

export const ffBtnStyle = twMerge(
	`absolute right-0 bottom-0 mr-5 mb-5 hover:scale-110 transition-transform cursor-pointer pointer-events-auto hover:opacity-full`,
);
