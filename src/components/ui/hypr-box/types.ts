import { leanStyle, lgStyle, mdStyle, smStyle } from "./styles";

export const SPEED_MID = "md" as const;
export const SPEED_SLOW = "sm" as const;
export const SPEED_FAST = "lg" as const;

export const SIZE_LG = "lg" as const;
export const SIZE_MD = "md" as const;
export const SIZE_SM = "sm" as const;
export const SIZE_LEAN = "lean" as const;

export type SPEED = typeof SPEED_FAST | typeof SPEED_MID | typeof SPEED_SLOW;
export type SIZE =
	| typeof SIZE_LG
	| typeof SIZE_MD
	| typeof SIZE_SM
	| typeof SIZE_LEAN;

export const SIZE_MAP: Record<SIZE, string> = {
	[SIZE_LG]: lgStyle,
	[SIZE_MD]: mdStyle,
	[SIZE_SM]: smStyle,
	[SIZE_LEAN]: leanStyle,
};

export const SPEED_MAP: Record<SPEED, number> = {
	[SPEED_FAST]: 0.2,
	[SPEED_MID]: 0.4,
	[SPEED_SLOW]: 0.8,
};
