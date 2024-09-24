export default function CreateProjectForm() {
	return (
		<form>
			<h1>Add a project</h1>
			<p id="response-message"></p>
			<label htmlFor="name">Project name (required)</label>
			<input
				type="text"
				name="name"
				id="name"
				placeholder="My fantastic project"
				required
			/>
			<label htmlFor="description">Project description</label>
			<input
				type="text"
				name="description"
				id="description"
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
			/>
			<label htmlFor="image-url">Image URL</label>
			<input type="url" name="image-url" id="image-url" />
			<input type="submit" value="Add project" />
		</form>
	);
}