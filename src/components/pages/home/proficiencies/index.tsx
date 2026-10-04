import { HammerIcon } from "lucide-react";
import AnimateTextStagger from "@/components/ui/animate-text-stagger";
import HyprBox from "@/components/ui/hypr-box";
import { SPEED_FAST } from "@/components/ui/hypr-box/types";
import LogoList from "@/components/ui/logo-list";
import type { Logo } from "@/components/ui/logo-list/types";
import { smallTitleStyle, subTitleStyle } from "../styles";
import { proficienciesStyle } from "./styles";

const proficientLogos: Logo[] = [
	{ name: "JavaScript", filename: "javascript.png" },
	{ name: "Typescript", filename: "typescript.png" },
	{ name: "PHP", filename: "php.svg" },
	{ name: "NextJS", filename: "nextjs.svg" },
	{ name: "ReactJS", filename: "react.svg" },
	{ name: "NodeJS", filename: "nodejs.svg" },
	{ name: "Prisma", filename: "prisma.svg" },
	{ name: "Laravel", filename: "laravel.png" },
	{ name: "Neovim", filename: "neovim.png" },
	{ name: "Tmux", filename: "tmux.png" },
];

const capableLogos: Logo[] = [
	{ name: "NestJS", filename: "nestjs.svg" },
	{ name: "Heroku", filename: "heroku.png" },
	{ name: "Tailwind", filename: "tailwind.svg" },
	{ name: "Dokploy", filename: "dokploy.svg" },
	{ name: "Golang", filename: "golang.png" },
	{ name: "Material UI", filename: "material-ui.svg" },
	{ name: "Emotion CSS", filename: "emotion.svg" },
	{ name: "Styled Components CSS", filename: "styled-components.png" },
	{ name: "Bevy", filename: "bevy.svg" },
	{ name: "Fedora", filename: "fedora.png" },
	{ name: "ChatGPT", filename: "chatgpt.png" },
	{ name: "Postgres", filename: "postgres.webp" },
	{ name: "MySQL", filename: "mysql.svg" },
];

const beginnersLogos: Logo[] = [
	{ name: "Rust", filename: "rust.png" },
	{ name: "Tanstack", filename: "tanstack.svg" },
	{ name: "Zod", filename: "zod.png" },
	{ name: "Zig", filename: "zig.png" },
	{ name: "C#", filename: "csharp.svg" },
	{ name: "Raylib", filename: "raylib.png" },
	{ name: "Monogame", filename: "monogame.svg" },
	{ name: "Opencode", filename: "opencode.svg" },
];

export default function Proficiencies() {
	return (
		<HyprBox
			className={proficienciesStyle}
			active1="rgba(80, 100, 100, 1)"
			active2="rgba(140, 20, 150, 1)"
			size={SPEED_FAST}
			id="languages-and-tools"
		>
			<AnimateTextStagger
				prependIcon={
					<HammerIcon size={42} color={"rgba(255, 200, 200, 1)"} />
				}
			>
				<h3 className={subTitleStyle}>
					Languages, tools, and other things.
				</h3>
				<h4 className={smallTitleStyle}>Proficient in:</h4>
			</AnimateTextStagger>

			<LogoList logos={proficientLogos} />

			<AnimateTextStagger>
				<h4 className={smallTitleStyle}>Capable with:</h4>
			</AnimateTextStagger>

			<LogoList logos={capableLogos} />

			<AnimateTextStagger>
				<h4 className={smallTitleStyle}>Beginning in:</h4>
			</AnimateTextStagger>

			<LogoList logos={beginnersLogos} />
		</HyprBox>
	);
}
