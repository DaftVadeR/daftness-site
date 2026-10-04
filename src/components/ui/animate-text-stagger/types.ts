import type { ElementType, RefObject } from "react";

export type Character = {
	ref: null | RefObject<null | HTMLElement>;
	letter: string;
};

export type Word = {
	ref: null | RefObject<null | HTMLElement>;
	characters: Character[];
};

export type TextLine = {
	tag: ElementType;
	value: string;
	words: Word[];
	className: string | undefined;
};

export const SPEED_MID = "md" as const;
export const SPEED_SLOW = "sm" as const;
export const SPEED_FAST = "lg" as const;
export const SPEED_FASTEST = "pew" as const;

export const SIZE_LG = "lg" as const;
export const SIZE_MED = "md" as const;
export const SIZE_SM = "sm" as const;
export const SIZE_LEAN = "lean" as const;

export type SPEED =
	| typeof SPEED_FASTEST
	| typeof SPEED_FAST
	| typeof SPEED_MID
	| typeof SPEED_SLOW;
export type SIZE =
	| typeof SIZE_LG
	| typeof SIZE_MED
	| typeof SIZE_SM
	| typeof SIZE_LEAN;

export const ANIM_LETTER_DELAY = 0.1;
export const ANIM_LETTER_TRANSITION = ANIM_LETTER_DELAY - 0.04;

export const SPEED_MAP: Record<SPEED, number> = {
	[SPEED_FASTEST]: 0.03,
	[SPEED_FAST]: 0.07,
	[SPEED_MID]: 0.14,
	[SPEED_SLOW]: 0.2,
};
