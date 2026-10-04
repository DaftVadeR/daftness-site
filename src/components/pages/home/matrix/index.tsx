// @ts-nocheck — WIP file, contains incomplete logic
"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { round } from "@/util/numbers";
import {
	characterStyle,
	characterWrapperStyle,
	containerInnerStyle,
	containerStyle,
	rowStyle,
	triggerStyle,
	triggersContainerStyle,
} from "./styles";

// Matrix green code effect, where it runs down the screen.
//
// The effect seems to be comprised of the following:
// - There are a group of characters that fall through a line of "code" or "text", and the text that it passes gets made visible through
// an animated transition. These same characters then disappear after a short time. The group of characters falling will be called the trigger text
// - There are pregenerated lines of characters that are always present in the background, but are invisible or visible after being passed by the group of characters (trigger text). Some examples of this effect actually move the background text downwards too. Try both.
// - the pregenerated characters can have their opacity locked, or maybe have their opacity animate slower so that it causes some asynchronicity between the trigger text and the background text.
// - there is a shimmering that happens around the characters, an interlacing-like effect.
// - the text can either be zeros and ones, or characters from unicode.
// - the effect is simpler without it, but some examples of the animation have a 3d effect, where it seems like you're passing through the lines of text in first person. And as you move forward, the lines get larger, creating a depth-of-field effect. This is optional.

const charactersToUse = "01"; // pregenerated for performance reasons
const characterTrigger = "すごい";
const characterTriggerArr = characterTrigger.split(""); // cache so it only does it once

const CHARACTER_WIDTH = 40;
const CHARACTER_HEIGHT = 40;
const TRIGGER_STAGGER = 0.2;
const TRIGGER_ANIM_DURATION = 5;
const NUM_TRAILS = 5;

type Row = {
	characters: Character[];
};

type Character = {
	ref: null | React.RefObject<HTMLSpanElement | null>;
	value: string;
};

type Trigger = {
	ref: null | React.RefObject<HTMLDivElement | null>;
	characters: Character[];
};

const getRandomTrigger = (
	cols: number,
	triggers: Trigger[],
): Trigger | null => {
	const newIndex = Math.floor(Math.random() * cols);

	const indexes = Array.from(triggers.keys());

	return indexes.indexOf(newIndex) !== -1 ? triggers[newIndex] : null;
};

export default function MatrixBg() {
	const [rows, setRows] = useState(0);
	const [cols, setCols] = useState(0);
	const [triggersToQueue, setTriggersToQueue] = useState<Trigger[]>([]); // test data - also starts queue of text

	// dont want to do it more than once.
	const [characters, setCharacters] = useState<Row[]>([]);
	const [triggers, setTriggers] = useState<Trigger[]>([]);

	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!containerRef.current) {
			console.log("Ref not found - component may have unmounted");
			return;
		}

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const rect = entry.target.getBoundingClientRect();

				setRows(round(rect.height / CHARACTER_HEIGHT));
				setCols(round(rect.width / CHARACTER_WIDTH));

				console.log(
					`Container resized: ${rect.width}x${rect.height}, ROWS: ${rows}, COLS: ${cols}`,
				);
			}
		});

		resizeObserver.observe(containerRef.current);

		return () => resizeObserver.disconnect();
	}, []);

	useEffect(() => {
		if (rows < 0 && cols < 0) {
			return;
		}

		const newCharacters: Row[] = [];

		for (let r = 0; r < rows; r++) {
			const rowChars: Character[] = [];

			for (let c = 0; c < cols; c++) {
				const char =
					charactersToUse[
						Math.floor(Math.random() * charactersToUse.length)
					];

				rowChars.push({
					ref: null,
					value: char,
				});
			}

			newCharacters.push({
				characters: rowChars,
			});
		}

		const newTriggers: Trigger[] = [];

		for (let t = 0; t < cols; t++) {
			const triggerNew: Trigger = {
				ref: null,
				characters: characterTriggerArr.map((char) => ({
					ref: null,
					value: char,
				})),
			};

			newTriggers.push(triggerNew);
		}

		setTriggers(newTriggers);

		// also queue up trigger text - text that causes text it passes to animate in.
		const newTriggersToQueue: Trigger[] = [];

		for (let t = 0; t < NUM_TRAILS; t++) {
			const newTrigger = getRandomTrigger(cols, newTriggers);

			if (newTrigger) {
				newTriggersToQueue.push(newTrigger);
			}
		}

		setTriggersToQueue(newTriggersToQueue);

		console.log(
			"Generated new characters for matrix background.",
			newCharacters,
		);
		setCharacters(newCharacters);
	}, [rows, cols]);

	console.log(`ROWS: ${rows}, COLS: ${cols}`);

	useGSAP(() => {
		if (!containerRef.current) {
			return;
		}

		if (cols <= 0 || rows <= 0) {
			return;
		}

		// remove triggers from queue

		// start animations for queue
		for (let t = 0; t < triggersToQueue.length; t++) {
			const trigger = triggersToQueue[t];

			if (!trigger.ref || !trigger.ref.current) {
				continue;
			}

			gsap.to(trigger.ref, {
				translateY: "100%",
				duration: TRIGGER_ANIM_DURATION,

				// ease: "power2.out", // kept linear as its most natural

				// // Just needed for updating the blinking cursor's position on each character's staggered animation.
				// onStart: function() {
				//     if (!containerRef?.current || !char.ref?.current) {
				//         return;
				//     }
				//
				//     char.ref.current.style.display = 'inline-block';
				//     char.ref.current.style.visibility = 'visible';
				//
				//     const charRect = char.ref.current.getBoundingClientRect();
				//
				//     // using offset as simpler - rect was giving issues due to not being relative.
				//     const relativeX = char.ref.current.offsetLeft + charRect.width * 3;
				//     const relativeY = char.ref.current.offsetTop;
				//
				//     setCursorPosition([relativeX, relativeY]);
				// },
				//
				onComplete: () => {
					trigger.ref?.current?.style.setProperty(
						"transform",
						"translateY(0)",
					);
					trigger.ref?.current?.style.setProperty(
						"visibility",
						"none",
					);

					setTriggersToQueue((trig) => {
						const newQueue = [...trig];

						if (newQueue.indexOf()) {
							return newQueue;
						}
					});
				},
			}).delay(TRIGGER_STAGGER);
		}

		setTriggersToQueue([]);
	}, [containerRef, cols, rows, triggersToQueue]);

	return (
		<div
			aria-hidden="true"
			aria-label="Matrix background effect"
			className={containerStyle}
			ref={containerRef}
		>
			{/* 
            has to be absolute positioned to prevent additional 
            resizing after characters are inserted into the container itself
            */}
			<div className={containerInnerStyle}>
				{characters.map((row, rowIndex) => {
					return (
						<div
							className={clsx(rowStyle)}
							key={`matrix_row_${rowIndex}`}
						>
							{row.characters.map((char, colIndex) => {
								return (
									<span
										key={`matrix_char_${rowIndex}_${colIndex}`}
										className={clsx(characterWrapperStyle)}
										style={{
											width: `${CHARACTER_WIDTH}px`,
											height: `${CHARACTER_HEIGHT}px`,
										}}
										ref={char.ref}
									>
										<span
											className={clsx(
												characterStyle,
												"animate-character",
											)}
										>
											{char.value}
										</span>
									</span>
								);
							})}
						</div>
					);
				})}
			</div>
			{/* Trigger characters */}
			<div className={triggersContainerStyle}>
				{Array.from({ length: cols }).map((_, colIndex) => {
					return (
						<div
							className={clsx(
								triggerStyle,
								triggersToQueue.indexOf(colIndex) !== -1
									? "animate-trigger"
									: "",
							)}
							style={{
								left: `${colIndex * CHARACTER_WIDTH}px`,
							}}
						>
							{characterTrigger.split("").map((char) => (
								<span
									key={`matrix_trigger_${colIndex}`}
									className={characterWrapperStyle}
									style={{
										width: `${CHARACTER_WIDTH}px`,
										flexBasis: `${CHARACTER_WIDTH}px`,
										height: `${CHARACTER_HEIGHT}px`,
									}}
								>
									<span
										className={clsx(characterStyle)}
										style={
											{
												// animationDelay: `${colIndex * 0.1}s`,
											}
										}
									>
										{char}
									</span>
								</span>
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
}
