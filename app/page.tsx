import type { Metadata } from "next";
import Home from "@/components/pages/home";

export const metadata: Metadata = {
	title: "The DafT Dev, also known as Ross D - NextJS, Typescript and Golang Web Developer.",
	description:
		"The personal site of a daft fullstack developer by the name of Ross D, a Typescript, PHP and new-to-Golang Web developer in South Africa, who loves learning new programming languages and paradigms, both on server and client.",
};

export default function Page() {
	return <Home />;
}
