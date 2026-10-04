"use client";

// Version 2. I had a discussion with ChatGPT regarding how to use GSAP for such a situation.
//
// It naturally gave me an overengineered solution for the GSAP calls, but I managed to get it working,
// though was unhappy about it.
//
// It has the same shortcomings as version 1 with not being sequenced, but it has CSS-based
// GPU-accelerated animations using GSAP and an animated cursor.
//

import gsap from "gsap";

import { type ElementType, useEffect, useMemo, useRef, useState } from "react";

const INTERVAL_MS = 140;
const CURSOR_CHARACTER = "▋";
const REPLAY_ON_CHANGE = true;

// Animation tuning
const CHAR_FROM = { opacity: 0.25, scale: 0.4 };
const CHAR_TO_POP = {
	opacity: 0.65,
	scale: 1.25,
	duration: 0.18,
	ease: "back.out(2.2)",
};
const CHAR_TO_SETTLE = {
	scale: 1,
	duration: 0.1,
	opacity: 1,
	ease: "power2.out",
};
const CURSOR_BLINK = {
	opacity: 0,
	duration: 0.5,
	ease: "none",
	repeat: -1,
	yoyo: true,
};

type AnimatedTextProps = {
	children: string;
	tagType?: ElementType;
};

export default function AnimatedText({
	children,
	tagType: Tag = "span",
}: AnimatedTextProps) {
	const { mounted, typedChars, cursorRef, lastCharRef, rootRef } =
		useTerminalTyping(children);

	return (
		<Tag
			ref={rootRef}
			className="inline whitespace-pre-wrap"
			aria-label={children}
		>
			{/* Screen readers */}
			<span className="sr-only">{children}</span>

			{/* SSR-visible text */}
			<span
				aria-hidden={mounted}
				className={mounted ? "hidden" : undefined}
			>
				{children}
			</span>

			{mounted && (
				<ClientAnimation
					cursorRef={cursorRef}
					lastCharRef={lastCharRef}
					typedChars={typedChars}
				/>
			)}
		</Tag>
	);
}

function useTerminalTyping(text: string) {
	const [mounted, setMounted] = useState(false);
	const [reduceMotion, setReduceMotion] = useState(false);
	const [inView, setInView] = useState(false);
	const [typedCount, setTypedCount] = useState(0);

	const timerRef = useRef<number | null>(null);
	const lastCharRef = useRef<HTMLSpanElement | null>(null);
	const cursorRef = useRef<HTMLSpanElement | null>(null);
	const rootRef = useRef<HTMLElement | null>(null);

	const chars = useMemo(() => Array.from(text), [text]);

	// Mount
	useEffect(() => setMounted(true), []);

	// Reduced motion
	useEffect(() => {
		if (typeof window === "undefined") return;
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReduceMotion(mq.matches);
		update();
		mq.addEventListener?.("change", update);
		return () => mq.removeEventListener?.("change", update);
	}, []);

	// In-view detection (simple + SSR-safe)
	useEffect(() => {
		if (!mounted) return;
		const el = rootRef.current;
		if (!el) return;

		if (reduceMotion) {
			setInView(true);
			return;
		}

		const obs = new IntersectionObserver(
			([entry]) => setInView(entry.isIntersecting),
			{ root: null, threshold: 0.15 },
		);

		obs.observe(el);
		return () => obs.disconnect();
	}, [mounted, reduceMotion]);

	// Typing progression (gated by inView)
	useEffect(() => {
		if (!mounted) return;
		if (!inView) return;

		if (REPLAY_ON_CHANGE) setTypedCount(0);

		timerRef.current && window.clearInterval(timerRef.current);
		timerRef.current = null;

		if (reduceMotion) {
			setTypedCount(chars.length);
			return;
		}

		timerRef.current = window.setInterval(() => {
			setTypedCount((c) => {
				if (c >= chars.length) {
					timerRef.current && window.clearInterval(timerRef.current);
					timerRef.current = null;
					return c;
				}
				return c + 1;
			});
		}, INTERVAL_MS);

		return () => {
			timerRef.current && window.clearInterval(timerRef.current);
			timerRef.current = null;
		};
	}, [mounted, inView, reduceMotion, chars.length, text]);

	// Animate newest character (keyframes, no stranded scale)
	useEffect(() => {
		if (!mounted || reduceMotion || !inView) return;

		const el = lastCharRef.current;
		if (!el) return;

		const ctx = gsap.context(() => {
			gsap.killTweensOf(el);
			gsap.set(el, CHAR_FROM);

			gsap.to(el, {
				keyframes: [
					{ ...CHAR_TO_POP },
					{
						...CHAR_TO_SETTLE,
						onComplete: () =>
							gsap.set(el, { clearProps: "transform,opacity" }),
					},
				],
			});
		}, el);

		return () => {
			ctx.revert();
		};
	}, [typedCount, mounted, reduceMotion, inView]);

	// Cursor blink (gated by inView)
	useEffect(() => {
		if (!mounted || reduceMotion || !inView || !cursorRef.current) return;

		gsap.killTweensOf(cursorRef.current);
		gsap.set(cursorRef.current, { opacity: 1 });
		gsap.to(cursorRef.current, CURSOR_BLINK);

		return () => {
			cursorRef.current && gsap.killTweensOf(cursorRef.current);
		};
	}, [mounted, reduceMotion, inView]);

	// When text changes while mounted & in view, restart cleanly
	useEffect(() => {
		if (!mounted) return;
		if (!inView) return;
		if (!REPLAY_ON_CHANGE) return;
		setTypedCount(0);
	}, [text, mounted, inView]);

	// If we leave view, stop the interval (avoid hidden work)
	useEffect(() => {
		if (!mounted) return;
		if (inView) return;
		timerRef.current && window.clearInterval(timerRef.current);
		timerRef.current = null;
	}, [mounted, inView]);

	const typedChars = useMemo(
		() => chars.slice(0, typedCount),
		[chars, typedCount],
	);

	return { mounted, typedChars, cursorRef, lastCharRef, rootRef };
}

const ClientAnimation = ({
	typedChars,
	cursorRef,
	lastCharRef,
}: {
	typedChars: string[];
	cursorRef: React.RefObject<HTMLSpanElement | null>;
	lastCharRef: React.RefObject<HTMLSpanElement | null>;
}) => {
	return (
		<span aria-hidden="true" className="inline">
			{typedChars.map((ch, i) => {
				const isLast = i === typedChars.length - 1;
				return (
					<span
						key={`${i}-${ch}`}
						ref={isLast ? lastCharRef : null}
						className="inline-block will-change-transform"
					>
						{ch === " " ? "\u00A0" : ch}
					</span>
				);
			})}

			{CURSOR_CHARACTER && (
				<span
					ref={cursorRef}
					aria-hidden="true"
					className="inline-block ml-0.5"
				>
					{CURSOR_CHARACTER}
				</span>
			)}
		</span>
	);
};
