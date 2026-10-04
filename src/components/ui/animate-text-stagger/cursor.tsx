import clsx from "clsx";
import type { RefObject } from "react";
import { cursorStyle } from "./styles";

const CURSOR_CHARACTER = "▋";

export default function CursorBlink({
	cursorRef,
	position,
}: {
	cursorRef: RefObject<null | HTMLSpanElement>;
	position: number[];
}) {
	if (position.length !== 2) {
		return null;
	}

	return (
		<span
			aria-hidden="true"
			ref={cursorRef}
			style={{
				transform: `translate(${position[0]}px, ${position[1]}px)`,
			}}
			className={clsx(cursorStyle)}
		>
			{CURSOR_CHARACTER}
		</span>
	);
}
