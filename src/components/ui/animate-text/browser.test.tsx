import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import AnimateText, { testId } from "./";

const testCharacterRender = (
	testId: string,
	copy: string,
	numChars: number = 0,
	withRender: boolean = true,
) => {
	if (withRender) {
		render(<AnimateText text={copy} />);
	}

	const lookFor = copy.substring(0, numChars);

	const span = screen.getByTestId(testId);

	expect(span).toBeInTheDocument();
	expect(span).toHaveTextContent(lookFor);
};

describe("TextTypingAnimation", () => {
	beforeEach(() => {
		// vi.useFakeTimers();
		// vi.useRealTimers();

		vi.useFakeTimers({
			shouldAdvanceTime: true, // auto-advances when promises/microtasks pending
		});
	});

	afterEach(() => {
		cleanup();
		vi.clearAllTimers();
	});

	it("renders first character of 'test' on first load", () => {
		const copy = "test";

		testCharacterRender(testId, copy, 1);
	});

	// prevent from just going good path.
	it("renders first character of 'sophisticated' on first load", () => {
		const copy = "sophisticated";

		testCharacterRender(testId, copy, 1);
	});

	it("renders two characters after interval period", async () => {
		const copy = "test.";

		render(<AnimateText>{copy}</AnimateText>);

		vi.advanceTimersByTime(900);

		await waitFor(() => {
			testCharacterRender(testId, copy, 5, false);
		});
	});

	it("renders all characters after enough time has passed", async () => {
		const copy = "Again.";

		render(<AnimateText>{copy}</AnimateText>);

		vi.advanceTimersByTime(7000);

		await waitFor(() => {
			testCharacterRender(testId, copy, copy.length, false);
		});
	});
});
