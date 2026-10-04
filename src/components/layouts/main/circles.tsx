"use client";

import clsx from "clsx";
import { type CSSProperties, useEffect, useState } from "react";
import {
	circleContainerStyle,
	circleRowStyle,
	circleStyle,
	col1Style,
	col2Style,
} from "./styles";

const COLORS = ["col1", "col2"] as const;

type Color = (typeof COLORS)[number];

// maps classname to color identifier
const COLOR_MAP: Record<Color, string> = {
	[COLORS[0]]: col1Style,
	[COLORS[1]]: col2Style,
};

const circleLocations = [
	[0, 0],
	["100%", 0],
	[0, "100%"],
	["100%", "100%"],
];

type Circle = {
	size: number;
	top: string | number;
	left: string | number;
	color: Color;
};

function isFirefoxCheck() {
	if (typeof navigator !== "undefined" && navigator) {
		const userAgent = navigator.userAgent;
		return /firefox|fxios/i.test(userAgent);
	}

	return false;
}

function isSafariCheck() {
	if (typeof navigator !== "undefined" && navigator) {
		const userAgent = navigator.userAgent;

		const isChrome =
			/Chrome/.test(userAgent) && userAgent.indexOf("Chrome") > -1; // chrome uses safari user agent

		return !isChrome && /Safari/i.test(userAgent);
	}

	return false;
}

function getColor(color: Color): string {
	return COLOR_MAP[color];
}

export default function Circles() {
	const [circles, setCircles] = useState<Circle[]>([]);

	useEffect(() => {
		const isFirefox = isFirefoxCheck();
		const isSafari = isSafariCheck();

		if (!isFirefox) {
			const newCircles: Circle[] = [];

			for (let i = 0; i < 4; i++) {
				if (isSafari && i % 2 === 0) {
					continue;
				}

				// const size = Math.max(Math.random() * 400, 200);
				const size = 400;
				// const color = Math.round(Math.random() * (COLORS.length - 1));
				const color = 0;

				newCircles.push({
					color: COLORS[color],
					top: `${circleLocations[i][0]}`,
					left: `${circleLocations[i][1]}`,
					size,
				});
			}

			setCircles(newCircles);
		}
	}, []);

	const isFirefox = isFirefoxCheck();
	// const isSafari = isSafariCheck();

	if (isFirefox) {
		return null;
	}

	return (
		<div className={clsx(circleContainerStyle)}>
			{circles.map((circle, i) => {
				{
					/* const isRight = circle.left === '100%'; */
				}
				{
					/* const isBottom = circle.top === '100%'; */
				}

				const customStyles: CSSProperties = {
					top: circle.top,
					left: circle.left,
				};

				return (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: static list generated once and never reordered
						key={i}
						className={circleRowStyle}
						style={customStyles}
					>
						<div
							// lazy way - takes advantage of class order in the CSS.
							className={clsx(
								circleStyle,
								getColor(circle.color),
							)}
							style={{
								height: circle.size,
								width: circle.size,
								transform: `translateX(-50%) translateY(-50%)`,
							}}
						/>
					</div>
				);
			})}
		</div>
	);
}
