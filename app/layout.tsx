import type { Metadata } from "next";
import { Domine, Source_Code_Pro } from "next/font/google";
import Ascii from "@/components/ui/ascii";

import "./globals.css";

const domine = Domine({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
	variable: "--font-domine",
});

const sourceCodePro = Source_Code_Pro({
	subsets: ["latin"],
	weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	display: "swap",
	variable: "--font-source-code-pro",
});

export const metadata: Metadata = {
	title: "The DafT Dev, also known as Ross D",
	description:
		"The DafT Dev, also known as Ross D - NextJS, Typescript and Golang Web Developer.",
	icons: [
		{
			rel: "icon",
			type: "image/png",
			sizes: "96x96",
			url: "/favicon-96x96.png",
		},
		{ rel: "icon", type: "image/svg+xml", url: "/favicon.svg" },
		{ rel: "shortcut icon", url: "/favicon-new.ico" },
		{
			rel: "apple-touch-icon",
			sizes: "180x180",
			url: "/apple-touch-icon.png",
		},
	],
	manifest: "/site.webmanifest",
	appleWebApp: {
		title: "Daft Dev",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${domine.variable} ${sourceCodePro.variable}`}
		>
			<body>
				{children}
				<Ascii />
			</body>
		</html>
	);
}
