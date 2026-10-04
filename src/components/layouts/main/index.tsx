"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import { useResizePause } from "@/components/ui/use-resize-pause";
import Circles from "./circles";
import {
	containerStyle,
	contentStyle,
	footerStyle,
	headerStyle,
	layoutContentWrapperStyle,
} from "./styles";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const layoutRef = useRef<HTMLDivElement>(null);
	const [size, setSize] = useState([0, 0]);

	const isResizing = useResizePause(layoutRef);

	// biome-ignore lint/correctness/useExhaustiveDependencies: isResizing is a trigger to re-measure the window once resizing pauses
	useEffect(() => {
		const isClient = typeof window !== "undefined";

		if (isClient) {
			setSize([window.innerWidth, window.innerHeight]);
		}
	}, [isResizing]);

	const canWorkAndFitViewFrame = size[1] > 0 && size[0] > 800;

	return (
		<div className={containerStyle} ref={layoutRef}>
			<div className={layoutContentWrapperStyle}>
				<div className={headerStyle}>
					<Header />
				</div>
				<div className={contentStyle}>{children}</div>
				<div className={footerStyle}>
					<Footer />
				</div>
			</div>
			{canWorkAndFitViewFrame && <Circles />}
		</div>
	);
}
