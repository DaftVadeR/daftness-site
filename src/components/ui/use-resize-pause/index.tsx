"use client";

// Human written comment. AI written code.
// AI-created resize hook for use with delaying resize events using debounce. A duplication in
// this type of logic was noticed and so a simpler reusable abstraction was made.

import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";

export function useResizePause(
	targetRef: React.RefObject<HTMLElement | null>,
	pauseMs = 400,
) {
	const [isResizing, setIsResizing] = useState(false);

	const onResizeEnd = useMemo(
		() =>
			debounce(() => {
				setIsResizing(false);
			}, pauseMs),
		[pauseMs],
	);

	useEffect(() => {
		const el = targetRef.current;
		if (!el) return;

		const observer = new ResizeObserver(() => {
			setIsResizing(true);

			onResizeEnd();
		});

		observer.observe(el);

		return () => {
			observer.disconnect();
			onResizeEnd.cancel();
		};
	}, [targetRef, onResizeEnd]);

	return isResizing;
}
