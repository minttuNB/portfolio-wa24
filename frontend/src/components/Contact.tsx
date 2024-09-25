import { PropsWithChildren } from "react";

export type ContactProps = {
	email: string;
};
export default function Contact(
	props: Readonly<PropsWithChildren<ContactProps>>
) {
	return (
		<>
			{props.children}
			<button onClick={()=>alert(`My email address is ${props.email}`)}>Show contact info</button>
		</>
	);
}
