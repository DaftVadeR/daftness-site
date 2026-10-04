import Link from "next/link";
import { containerStyle, hiddenTitleStyle, logoLinkStyle } from "./styles";

export default function Header() {
	return (
		<>
			<header className={containerStyle}>
				<h1 className={hiddenTitleStyle}>Web Developer - Daftness</h1>
				<Link
					href="/"
					title="Home"
					aria-label="Home"
					className={logoLinkStyle}
				>
					DafT the Dev
				</Link>
			</header>
		</>
	);
}
