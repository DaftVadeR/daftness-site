"use client";

// This was an initial version of the AnimateText component, using a non-GPU accelerated/animated typing animation effect.
// It has some integration tests, and is very simple in that it can only have one child component/element,
// and because of that, the animations will all happen at once. There isn't a sequencing effect like with
// the one being used across the site, V3 (in animate-text-stagger).

import {
	type Dispatch,
	type ReactNode,
	type RefObject,
	type SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";

import { characterStyle } from "./styles";

const CHARACTER_TIMEOUT = 200;

/*
 Important to store in a single variable as it will be altered a bit until a sweet spot is found between:

 - Not making the layout look too empty on first (user) render, making it unclear where things are.
 - Not starting the animation too many characters in, making the effect unreminiscent of typing.
 - Not going too slowly. Too fast === choppy. Too slow === impaired reading experience.

 The actual text is rendered on first render if not rendered as a client component, so SEO should remain intact.
*/
const STARTING_CHARACTER = 1;

export const testId = "animated-text";

let intervalId: number = -1;

const updateCharacterLength =
	(
		textRef: RefObject<string>,
		numCharsRef: RefObject<number>,
		// Used to force a rerender, hence not just using numCharsRef.
		setNumChars: Dispatch<SetStateAction<number>>,
	) =>
	(): boolean => {
		const newNumChars = numCharsRef.current + 1;

		if (textRef.current.length >= newNumChars) {
			numCharsRef.current = newNumChars;
			setNumChars(newNumChars);

			return true;
		}

		// No more characters to show, stop the interval.
		return false;
	};

const useTypingAnimation = (textFinal: string) => {
	const currentTextRef = useRef(textFinal);
	const currentNumCharsRef = useRef(STARTING_CHARACTER);

	const [numChars, setNumChars] = useState(STARTING_CHARACTER);

	useEffect(() => {
		currentTextRef.current = textFinal;
		currentNumCharsRef.current = STARTING_CHARACTER;

		// BEGIN the typing!
		intervalId = window.setInterval(
			updateCharacterLength(
				currentTextRef,
				currentNumCharsRef,
				setNumChars,
			),
			CHARACTER_TIMEOUT,
		);

		return () => {
			window.clearInterval(intervalId);
		};
	}, [textFinal]);

	return { currentTextRef, numChars };
};

/**
 * Not an ideal implementation from an optimisation perspective.
 * Could find ways to delegate some things to CSS (GPU rendering) or using the Web animation API,
 * using requestAnimationFrame and other things for smoother updates, etc.
 **/
export default function AnimateText({
	text,
	children,
}: {
	/*children: React.ReactNode,*/ text?: string;
	children?: ReactNode;
}) {
	/* Just use a ref to reduce rerenders. It doesn't need to fire for both characters and the number incrementer. */
	const textFinal = children?.toString() || text || false;

	// Added for aggressive debugging reasons, as an assert. Remove once done.
	if (!textFinal) {
		throw new Error("No text provided to AnimateText component");
	}

	const { currentTextRef, numChars } = useTypingAnimation(textFinal);

	return (
		<div data-testid={testId}>
			{/* 
        Be vigilant of it being one character behind,
        due to the refs not triggering rerenders 
      */}
			{currentTextRef.current
				.substring(0, numChars)
				.split("")
				.map((character: string, index: number) => {
					return (
						// biome-ignore lint/suspicious/noArrayIndexKey: characters of a growing string prefix; position is the identity
						<span className={characterStyle} key={index}>
							{character}
						</span>
					);
				})}
		</div>
	);
}
