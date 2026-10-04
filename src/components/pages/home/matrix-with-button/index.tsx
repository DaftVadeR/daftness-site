"use client";

import { useState } from "react";
import HyprBox from "@/components/ui/hypr-box";

// import Matrix from "../matrix"; // my version still wip
import Matrix from "../matrix-gpt";

import {
	btnContainerStyle,
	containerStyle,
	showMatrixBtnStyle,
	titleStyle,
} from "./styles";

export default function MatrixWithButton() {
	const [isMatrixVisible, setIsMatrixVisible] = useState(false);

	return (
		<HyprBox
			active1="rgba(10, 100, 100, 1)"
			active2="rgba(0, 30, 30, 1)"
			size="lean"
			className={containerStyle}
		>
			<div className={btnContainerStyle}>
				{!isMatrixVisible && (
					<button
						onClick={() => setIsMatrixVisible(!isMatrixVisible)}
						className={showMatrixBtnStyle}
					>
						Click me... Come on... Do it...
					</button>
				)}
				{isMatrixVisible && (
					<h5 className={titleStyle}>
						Wow. You actually pressed it. You crazy person, you.
					</h5>
				)}
			</div>

			{isMatrixVisible && <Matrix />}
		</HyprBox>
	);
}
