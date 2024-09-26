import { FormEvent, PropsWithChildren, useState } from "react";

export type ContactProps = {
	email: string;
	onSendMessageFormSubmitted: (event: FormEvent<HTMLFormElement>) => void;
};
export default function Contact(props: Readonly<PropsWithChildren<ContactProps>>) {
	const [name, setName] = useState("");
	const [nameError, setNameError] = useState("");
	const [message, setMessage] = useState("");
	const [messageError, setMessageError] = useState("");
	function updateName(event: FormEvent<HTMLInputElement>) {
		const input = event.target as HTMLInputElement | null;
		if (!input) return;
		if (input.value.length < 1) {
			setNameError("Your name must be at least 1 character long.");
			return;
		}
		setName(input.value);
		setNameError("");
	}
	function updateMessage(event: FormEvent<HTMLTextAreaElement>) {
		const input = event.target as HTMLTextAreaElement | null;
		if (!input) return;
		if (input.value.length < 1) {
			setMessageError("Your message must be at least 1 character long.");
			return;
		}
		setMessage(input.value);
		setMessageError("");
	}
	return (
		<>
			{props.children}
			<button onClick={() => alert(`My email address is ${props.email}`)}>Show email address</button>
			<form
				onSubmit={(event) => {
					props.onSendMessageFormSubmitted(event);
					setName("");
					setMessage("");
				}}
			>
				<label htmlFor="contact-name">Your name (required)</label>
				<input type="text" name="contact-name" id="contact-name" value={name} onChange={updateName} required />
				{nameError !== "" ? <p className="error-message">{nameError}</p> : ""}
				<label htmlFor="contact-name">Your message</label>
				<textarea
					name="contact-message"
					id="contact-message"
					value={message}
					onChange={updateMessage}
					rows={20}
					required
				></textarea>
				{messageError !== "" ? <p className="error-message">{messageError}</p> : ""}
				<input type="submit" value="Send message" />
				<h3>Sent data:</h3>
				<pre></pre>
			</form>
		</>
	);
}
