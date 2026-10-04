"use client";

import clsx from "clsx";
import { type MouseEvent, useCallback, useEffect, useState } from "react";
import { isServer } from "@/util/client";
import { linkStyle, listItemStyle, listStyle } from "./styles";

export type Link = {
	href: string;
	label: string;
};

export default function LinkSelector({ links }: { links: Link[] }) {
	const [indicatorWidth, setIndicatorWidth] = useState<number>(0);
	const [indicatorPosition, setIndicatorPosition] = useState<number>(0);

	const [isMounted, setIsMounted] = useState(false);

	const handleMouseOver = useCallback(
		(event: MouseEvent<HTMLLIElement>) => {
			if (!isMounted) return;

			const rect = event.currentTarget.getBoundingClientRect();

			const width = rect.width;
			const positionLeft = event.currentTarget.offsetLeft;

			setIndicatorWidth(width);
			setIndicatorPosition(positionLeft);
		},
		[isMounted],
	);

	useEffect(() => {
		if (!isServer()) {
			setIsMounted(true);
		}
	}, []);

	return (
		<>
			<ul
				className={clsx(listStyle, "link-list")}
				style={
					{
						"--before-width": `${indicatorWidth}px`,
						"--before-transform": `${indicatorPosition}px`,
					} as React.CSSProperties
				}
			>
				{links.map((link, index) => (
					<li
						className={clsx(listItemStyle)}
						key={index}
						onMouseOver={handleMouseOver}
					>
						<a
							href={link.href}
							className={linkStyle}
							aria-label={link.label}
						>
							{link.label}
						</a>
					</li>
				))}
			</ul>
			<style type="text/css">{`
                .link-list::before {
                  width: var(--before-width);
                  transform: translateX(var(--before-transform));
                }
            `}</style>
		</>
	);
}
