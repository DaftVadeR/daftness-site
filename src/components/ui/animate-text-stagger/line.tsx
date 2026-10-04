"use client";

// It was fun using <line.tag/> to dynamically render different HTML elements per line.
// I've not done it before in TS.

import clsx from "clsx";
import {
	isValidElement,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import CursorBlink from "./cursor";
import {
	iconPaddingStyle,
	iconStyle,
	lineContainerStyle,
	lineStyle,
} from "./styles";
import type { SPEED, TextLine } from "./types";
import WordSection from "./word";

const Icon = ({ icon, line }: { icon: React.ReactNode; line: TextLine }) => {
	return (
		<span
			className={clsx(iconStyle)}
			aria-hidden="true"
			aria-label={`Icon - ${line.value}`}
		>
			{icon}
		</span>
	);
};

export default function Line({
	icon,
	lineIndex,
	speed,
	isActive,
	line,
	onLineDone,
}: {
	icon?: React.ReactNode;
	lineIndex: number;
	speed: SPEED;
	isActive: boolean;
	line: TextLine;
	onLineDone: () => void;
}) {
	const [isMounted, setIsMounted] = useState(false);
	const [activeWord, setActiveWord] = useState(-1);
	const [isLineDone, setIsLineDone] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const cursorRef = useRef<HTMLSpanElement>(null);

	const [cursorPosition, setCursorPosition] = useState([0, 0]);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const onWordDone = useCallback(
		(wordIndex: number) => {
			const newIndex = wordIndex + 1;

			if (activeWord < newIndex) {
				setActiveWord(newIndex);
			}

			if (newIndex > line.words.length - 1) {
				onLineDone();
				setIsLineDone(true);
			}
		},
		[activeWord, line.words.length, onLineDone],
	);

	useEffect(() => {
		if (isMounted && isActive && activeWord === -1) {
			setActiveWord(0);
		}
	}, [isActive, isMounted, activeWord]);

	const hasIcon = icon && isValidElement(icon);

	return (
		<div className={lineContainerStyle} ref={containerRef}>
			<line.tag
				aria-label={line.value}
				className={clsx(
					line.className,
					lineStyle,
					hasIcon ? iconPaddingStyle : null,
				)}
			>
				{hasIcon && <Icon icon={icon} line={line} />}
				{line.words.map((word, wordIndex) => (
					<WordSection
						wordIndex={wordIndex}
						key={`${lineIndex}_${wordIndex}`}
						word={word}
						onWordDone={onWordDone}
						lineIndex={lineIndex}
						isActive={isActive && activeWord >= wordIndex}
						containerRef={containerRef}
						setCursorPosition={setCursorPosition}
						speed={speed}
					/>
				))}
				{!isLineDone &&
					isMounted &&
					isActive &&
					cursorPosition[0] !== 0 &&
					lineIndex < line.words.length - 1 && (
						<CursorBlink
							cursorRef={cursorRef}
							position={cursorPosition}
						/>
					)}
			</line.tag>
		</div>
	);
}
