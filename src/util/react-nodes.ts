import {
	Children,
	isValidElement,
	type ReactElement,
	type ReactNode,
} from "react";

export function getDirectText(children: ReactNode): string {
	let text = "";

	Children.forEach(children, (child) => {
		if (typeof child === "string" || typeof child === "number") {
			text += child;
		} else if (isValidElement(child)) {
			text += getDirectText(
				(child as ReactElement<{ children?: ReactNode }>).props
					.children,
			);
		}
	});

	return text;
}
