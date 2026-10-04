export interface GradientBorderProps {
	color1: string;
	color2: string;
	borderWidth?: number;
	borderRadius?: number;
	children: React.ReactNode;
}

export default function GradientBorder({
	color1,
	color2,
	borderWidth = 2,
	borderRadius = 12,
	children,
}: GradientBorderProps) {
	return (
		<div
			style={{
				borderRadius: `${borderRadius}px`,
				padding: `${borderWidth}px`,
				background: `linear-gradient(135deg, ${color1}, ${color2})`,
			}}
		>
			<div
				style={{
					borderRadius: `${borderRadius - borderWidth}px`,
					background: "white", // or your content background
					padding: "1rem",
				}}
			>
				{children}
			</div>
		</div>
	);
}
