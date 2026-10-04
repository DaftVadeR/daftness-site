import Layout from "../../layouts/main";
import Brands from "./brands";

import Intro from "./intro";
import MatrixWithButton from "./matrix-with-button";
import Proficiencies from "./proficiencies";
import { containerStyle } from "./styles";
import Tidbits from "./tidbits";

type Link = {
	label: string;
	href: string;
};

export const links: Link[] = [
	{ href: "#about-me", label: "About" },
	{ href: "#languages-and-tools", label: "Tools" },
	{ href: "#work-experience", label: "Work" },
];

export default function Home() {
	return (
		<Layout>
			<div className={containerStyle}>
				<Intro />
				<Tidbits />
				<Proficiencies />
				<Brands />
				<MatrixWithButton />
			</div>
		</Layout>
	);
}
