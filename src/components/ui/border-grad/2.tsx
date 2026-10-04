import type { GradientBorderProps } from "./1";

export default function GradientBorder({
	color1,
	color2,
	children,
}: GradientBorderProps) {
	return (
		<div
			style={{
				position: "relative",
				borderRadius: "12px",
				padding: "1rem",
				background: "transparent",
			}}
			className="gradient-border"
		>
			<div
				style={{
					position: "absolute",
					inset: 0,
					borderRadius: "inherit",
					padding: "2px",
					background: `linear-gradient(135deg, ${color1}, ${color2})`,
					WebkitMask:
						"linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
					WebkitMaskComposite: "xor",
					maskComposite: "exclude",
					pointerEvents: "none",
				}}
			/>
			{children}
		</div>
	);
}
