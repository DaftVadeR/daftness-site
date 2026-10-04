import clsx from "clsx";
import AnimateTextStagger from "@/components/ui/animate-text-stagger";
import HyprBox from "@/components/ui/hypr-box";
import { SPEED_SLOW } from "@/components/ui/hypr-box/types";
import { links } from "..";
import LinkSelector from "../link-selector";
import { paragraphStyle, smallParagraphStyle, titleStyle } from "../styles";

export default function Intro() {
	return (
		<HyprBox
			showScroll
			nextId={links[0].href.substring(1)}
			speed={SPEED_SLOW}
		>
			<AnimateTextStagger>
				<h2 className={titleStyle}>
					Welcome to my little corner of the Internet.
				</h2>

				<p
					className={clsx(smallParagraphStyle, "text-purple-600")}
				>{`{/* I use Neovim & Hyprland btw. */}`}</p>

				<p className={paragraphStyle}>
					My name is Ross D, and I'm a Web/software developer based
					out of South Africa.
				</p>
			</AnimateTextStagger>
			<LinkSelector links={links} />
		</HyprBox>
	);
}
