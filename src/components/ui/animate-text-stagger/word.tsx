"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import type { RefObject } from "react";
import { characterStyle, wordStyle } from "./styles";
import {
	ANIM_LETTER_TRANSITION,
	type SPEED,
	SPEED_FASTEST,
	SPEED_MAP,
	type Word,
} from "./types";

export default function WordSection({
	speed = SPEED_FASTEST,
	word,
	wordIndex,
	lineIndex,
	onWordDone,
	isActive,
	containerRef,
	setCursorPosition,
}: {
	speed: SPEED;
	word: Word;
	wordIndex: number;
	lineIndex: number;
	isActive: boolean;
	containerRef: null | RefObject<HTMLDivElement | null>;
	onWordDone: (wordIndex: number) => void;
	setCursorPosition: (pos: [number, number]) => void;
}) {
	// useEffect(() => {
	//     const charRect = char.ref.current.getBoundingClientRect();
	//
	// }, [word.ref]);
	//
	useGSAP(() => {
		// only start animations when active and refs are set.
		if (!isActive || !containerRef?.current) {
			return;
		}

		if (!word.ref) {
			return; // ref hasnt been set yet for some words.
		}

		word.characters.forEach((char, characterIndex) => {
			gsap.to(char.ref?.current ?? null, {
				opacity: 1,
				scale: 1,
				visibility: "visible",
				display: "inline-block",
				duration: ANIM_LETTER_TRANSITION,

				// ease: "power2.out", // kept linear as its most natural

				// Just needed for updating the blinking cursor's position on each character's staggered animation.
				onStart: () => {
					if (!containerRef?.current || !char.ref?.current) {
						return;
					}

					char.ref.current.style.display = "inline-block";
					char.ref.current.style.visibility = "visible";

					// using offset as simpler - rect was giving issues due to not being relative.
					const relativeX =
						char.ref.current.offsetLeft +
						char.ref.current.offsetWidth * 2;
					const relativeY = char.ref.current.offsetTop;

					setCursorPosition([relativeX, relativeY]);
				},

				onComplete: () => {
					if (characterIndex >= word.characters.length - 1) {
						onWordDone(wordIndex);
					}
				},
			}).delay(characterIndex * SPEED_MAP[speed]);
		});
	}, [isActive]);

	return (
		<span
			className={wordStyle}
			key={`word_${lineIndex}_${wordIndex}`}
			ref={(el) => {
				if (el) {
					if (word.ref) {
						word.ref.current = el;
					} else {
						word.ref = { current: el };
					}
				}
			}}
		>
			{word.characters.map((char, charIndex) => (
				<span
					ref={(el) => {
						if (el) {
							if (char.ref) {
								char.ref.current = el;
							} else {
								char.ref = { current: el };
							}
						}
					}}
					className={clsx(characterStyle, "invisible")}
					// biome-ignore lint/suspicious/noArrayIndexKey: characters of a static word, never reordered; duplicate letters are possible
					key={`char_${lineIndex}_${wordIndex}_${charIndex}`}
				>
					{char.letter}
				</span>
			))}
			{word.characters.length > 0 ? " " : ""}
		</span>
	);
}
