"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import {
	arrowStyle,
	containerStyle,
	innerContainerStyle,
	scrollBtnStyle,
} from "./styles";
import {
	type SIZE,
	SIZE_LG,
	SIZE_MAP,
	type SPEED,
	SPEED_MAP,
	SPEED_SLOW,
} from "./types";

gsap.registerPlugin(ScrollTrigger);

const ACTIVE_BORDER_COLOR = "rgba(100, 40, 190, 1)";
const ACTIVE_BORDER_COLOR2 = "rgba(0, 0, 160, 1)";

const INITIAL_BORDER_COLOR = "rgba(255, 255, 255, 0.2)";
const INITIAL_BORDER_COLOR2 = "rgba(20, 20, 20, 0.2)";

const animateFrom = (initial1: string, initial2: string) => ({
	scale: 0.9,
	opacity: 0.2,
	duration: 0,
	translateY: "80px",
	background: `linear-gradient(135deg, ${initial1}, ${initial2})`,
});

const animateTo = (
	containerRef: React.RefObject<HTMLElement | null>,
	speed: SPEED,
	active1: string,
	active2: string,
) => ({
	scale: 1,
	opacity: 1,
	translateY: 0,
	duration: SPEED_MAP[speed],
	ease: "bounce.out",
	background: `linear-gradient(135deg, ${active1}, ${active2})`,
	scrollTrigger: {
		trigger: containerRef.current,
		start: "top 80%",
		once: true,
	},
});

export default function HyprBox({
	children,
	id,
	nextId,
	className,
	speed = SPEED_SLOW,
	active1 = ACTIVE_BORDER_COLOR,
	active2 = ACTIVE_BORDER_COLOR2,
	initial1 = INITIAL_BORDER_COLOR,
	initial2 = INITIAL_BORDER_COLOR2,
	size = SIZE_LG,
	showScroll = false,
}: {
	children: React.ReactNode;
	id?: string;
	nextId?: string;
	className?: string;
	active1?: string;
	active2?: string;
	initial1?: string;
	initial2?: string;
	size?: SIZE;
	speed?: SPEED;
	showScroll?: boolean;
}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const innerContainerRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!containerRef.current) {
			return;
		}

		gsap.fromTo(
			containerRef.current,
			animateFrom(initial1, initial2),
			animateTo(containerRef, speed, active1, active2),
		);
	}, [containerRef]);

	return (
		<div
			className={clsx(containerStyle, className)}
			id={id}
			style={{
				background: `black`,
			}}
			ref={containerRef}
		>
			<div
				ref={innerContainerRef}
				className={clsx(innerContainerStyle, SIZE_MAP[size])}
				style={{
					backgroundColor: `black`,
				}}
			>
				{children}
			</div>
			{showScroll && (
				<a
					href={`#${nextId}`}
					className={scrollBtnStyle}
					aria-label="Scroll Down"
				>
					<ArrowDown
						className={arrowStyle}
						color={"var(--color-white)"}
						size={80}
					/>
				</a>
			)}
		</div>
	);
}
