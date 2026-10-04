"use client";

// This was the third attempt. Instead of relying on ChatGPT initially, I decided to do some research and found the stagger effect in the GSAP docs.
// This worked, but had some limitations with the React GSAP API, so we changed it using delay().
//
// I added sequencing in the form of callbacks that fire when a line is done, that triggers the next step.
// It's also refactored to be more structured and easy to navigate.
//
// The cursor is positioned correctly after each character, and only shows after the first character is animated,
// due to the weirdness that happens when transitioning the transform's x translation to a notably different value
// to the starting one (0).
//
// None of the comments are typed by ChatGPT, be it this one, or the ones below.

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
	Children,
	type ElementType,
	isValidElement,
	type ReactNode,
	useMemo,
	useRef,
	useState,
} from "react";
import { getDirectText } from "@/util/react-nodes";
import { useResizePause } from "../use-resize-pause";
import Line from "./line";
import { containerStyle } from "./styles";
import { type SPEED, SPEED_FASTEST, type TextLine } from "./types";

gsap.registerPlugin(ScrollTrigger);

const onDone = (nextStep: number, setStep: (step: number) => void) => () => {
	setStep(nextStep);
};

const normalizeChildrenToLines = (
	childrenNotNormalized: ReactNode,
): TextLine[] => {
	const children = Children.toArray(childrenNotNormalized).filter(
		isValidElement<HTMLElement>,
	);

	const lines: TextLine[] = [];

	// intentionally left out any resets of state vars, as I don't want the animation to reexecute.
	if (children) {
		for (let i = 0; i < children.length; i++) {
			const child = children[i];

			const text = getDirectText(child);

			const words = [];
			const splitWords = text.split(/(\s+)/);

			for (let w = 0; w < splitWords.length; w++) {
				const word = splitWords[w];

				if (word === " ") {
					continue;
				}

				words.push({
					characters: word.split("").map((char) => ({
						letter: char,
						ref: null,
					})),
					ref: null,
				});
			}

			lines.push({
				value: text,
				tag: child.type as ElementType,
				words,

				// characters: text.split('').map((char) => ({
				//     letter: char,
				//     ref: null,
				// })),
				className: child.props.className,
			} as TextLine);
		}
	}

	return lines;
};

export default function AnimateTextStagger({
	children: childrenNotNormalized,
	prependIcon,
	speed = SPEED_FASTEST,
}: {
	children: ReactNode;
	prependIcon?: ReactNode;
	speed?: SPEED;
}) {
	const [step, setStep] = useState(0);
	const [inViewport, setInViewport] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!containerRef.current) {
			return;
		}

		const trigger = ScrollTrigger.create({
			trigger: containerRef.current,
			start: "center bottom",

			onEnter: () => {
				setInViewport(true);
			},

			once: true,
		});

		return () => {
			trigger.kill();
		};
	}, [containerRef]);

	const isResizing = useResizePause(containerRef);

	// Run it on the server in function body so that it's available on SSR.
	// Not perfectly efficient, but good middleground as server-first is ideal.
	//
	// i normalize children to make sure we have an array of lines, and within each, an array of characters comprising each word.
	// I'm a fan of formalizing the data structure using custom types, to ensure that the data is structured adequately for the JSX so it's simpler.
	const lines: TextLine[] = useMemo(
		() => normalizeChildrenToLines(childrenNotNormalized),
		[childrenNotNormalized],
	);

	return (
		<div className={clsx(containerStyle)} ref={containerRef}>
			{lines.map((line, lineIndex) => {
				const followingStep = lineIndex + 1;

				return (
					<Line
						icon={lineIndex === 0 ? prependIcon : undefined}
						isActive={
							!isResizing && inViewport && lineIndex === step
						}
						line={line}
						lineIndex={lineIndex}
						speed={speed}
						key={lineIndex} // line index used in case of duplicate lines, a rare but possible use case.
						// If there is an ensuing step, pass a callback to advance to it via the state setter. */ }
						onLineDone={
							lines.length > followingStep
								? onDone(followingStep, setStep)
								: () => {}
						}
					/>
				);
			})}
			{/* speed up effect - not yet implemented */}
			{/* {step < lines.length && */}
			{/*     <button type="button" aria-label="Fast forward" className={ffBtnStyle} aria-hidden="true"> */}
			{/*         <FastForward size={40} color={'rgba(200, 90, 40, 0.5)'} /> */}
			{/*     </button>} */}
		</div>
	);
}
