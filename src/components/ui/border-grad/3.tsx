import type { GradientBorderProps } from "./1";

export default function AnimatedGradientBorder({
	color1,
	color2,
	children,
}: GradientBorderProps) {
	return (
		<div
			style={{
				borderRadius: "12px",
				padding: "2px",
				background: `linear-gradient(90deg, ${color1}, ${color2}, ${color1})`,
				backgroundSize: "200% 100%",
				animation: "gradientShift 20s ease infinite",
			}}
		>
			<style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
			<div
				style={{
					borderRadius: "10px",
					background: "rgb(0,0,0)",
					padding: "1rem",
				}}
			>
				{children}
			</div>
		</div>
	);
}
