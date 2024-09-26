import { FormEvent, useState } from "react";
import { CreateProjectFormProps } from "../types";

export default function CreateProjectForm(props: CreateProjectFormProps) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	//? const [date, setDate] = useState()
	const [url, setUrl] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [category, setCategory] = useState("");
	function updateName(event: FormEvent<HTMLInputElement>) {
		const input = event.target as HTMLInputElement | null;
		if (!input) return;
		if (input.value.length < 1) {
			//setNameError("Your name must be at least 1 character long.");
			return;
		}
		setName(input.value);
		//setNameError("");
	}
	return (
		<form onSubmit={props.onCreateProjectFormSubmitted}>
			<h1>Add a project</h1>
			<p id="response-message"></p>
			<label htmlFor="name">Project name (required)</label>
			<input
				type="text"
				name="name"
				id="name"
				value={name}
				onChange={updateName}
				placeholder="My fantastic project"
				required
			/>
			<label htmlFor="description">Project description</label>
			<input
				type="text"
				name="description"
				id="description"
				value={description}
				onChange={(event) => setDescription(event.target.value)}
				placeholder="A project solving all the problems in the world, and..."
			/>
			<label htmlFor="date">Project date</label>
			<input type="date" name="date" id="date" />
			<label htmlFor="url">Project URL</label>
			<input
				type="url"
				name="url"
				id="url"
				placeholder="https://episkklutprosjekt.no"
				value={url}
				onChange={(event) => setUrl(event.target.value)}
			/>
			<label htmlFor="image-url">Image URL</label>
			<input
				type="url"
				name="image-url"
				id="image-url"
				placeholder="https://episkklutprosjekt.no/logo.png"
				value={imageUrl}
				onChange={(event) => setImageUrl(event.target.value)}
			/>
			<label htmlFor="category">Category</label>
			<input
				type="text"
				name="category"
				id="category"
				placeholder="TypeScript, Rust, ..."
				value={category}
				onChange={(event) => {
					setCategory(event.target.value);
				}}
			/>
			<input type="submit" value="Add project" />
		</form>
	);
}
