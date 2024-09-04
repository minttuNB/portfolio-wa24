export const formHandler = async () => {
	const formDiv: HTMLFormElement =
		document.querySelector<HTMLFormElement>("form")!;
	formDiv.addEventListener("submit", async (e: SubmitEvent) => {
		e.preventDefault();
		let data = fetch("http://localhost:8080/api/projects", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "PUT",
			mode: "cors",
			body: JSON.stringify(
				Object.fromEntries(new FormData(formDiv).entries())
			),
		});
		const submitButton: HTMLInputElement =
			document.querySelector<HTMLInputElement>("input[type=submit]")!;
		submitButton.disabled = true;
		const mainElement: HTMLElement =
			document.querySelector<HTMLElement>("main")!;
		const response = await data;
		const jsonResponse = await response.json();
		if (response.status === 201) {
			mainElement.innerHTML =
				"<h1>Success!</h1><p>You will be redirected to the projects page shortly.</p>";
			window.location.replace(`${window.location.origin}`);
		} else {
			document
				.querySelector<HTMLParagraphElement>("#response-message")!
				.classList.add("error-message");
			document.querySelector<HTMLParagraphElement>(
				"#response-message"
			)!.innerHTML = `An error has occurred: ${jsonResponse.message}`;
			submitButton.disabled = false;
		}
	});
};
