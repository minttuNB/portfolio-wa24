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
			<button onClick={()=>alert(`My email address is ${props.email}`)}>Show email address</button>
			<form>
				<label htmlFor="contact-name">Your name (required)</label>
				<input type="text" name="contact-name" id="contact-name" required/>
				<label htmlFor="contact-name">Your message</label>
				<textarea name="contact-message" id="contact-message" rows={20} required></textarea>
				<input type="submit" value="Send message" />
			</form>
		</>
	);
}
