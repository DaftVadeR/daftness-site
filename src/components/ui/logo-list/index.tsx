import clsx from "clsx";

import { logoListItemStyle, logoListStyle, logoStyle } from "./styles";
import type { Logo } from "./types";

export default function LogoList({ logos }: { logos: Logo[] }) {
	return (
		<ul className={logoListStyle}>
			{logos.map((logo, index) => (
				<li key={index} className={clsx(logoListItemStyle)}>
					<img
						width={60}
						height={60}
						alt={logo.name}
						className={logoStyle}
						src={`/logos/${logo.filename}`}
						aria-label={logo.name}
					/>
				</li>
			))}
		</ul>
	);
}
