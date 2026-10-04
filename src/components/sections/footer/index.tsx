import clsx from "clsx";
import { containerStyle, paragraphStyle } from "./styles";

export default function Footer() {
	return (
		<div className={containerStyle}>
			{/* <ul className={listStyle}> */}
			{/*   <li className={listItemStyle}> */}
			{/*     <a>Home</a> */}
			{/*   </li> */}
			{/*   <li className={listItemStyle}> */}
			{/*     <a>Project links</a> */}
			{/*   </li> */}
			{/* </ul> */}
			<p
				className={clsx(
					paragraphStyle,
					"font-bold text-black p-4 bg-white",
				)}
			>
				{"{/* "}All the contents are belongs to me &#128125; More coming
				soon!{" */}"}
			</p>
		</div>
	);
}
