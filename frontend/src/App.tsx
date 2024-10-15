import { FormEvent, useEffect, useState } from "react";
import CreateProjectForm from "./components/CreateProjectForm";
import Experiences from "./components/Experiences";
import PageFooter from "./components/PageFooter";
import Projects from "./components/Projects";
import { Action, ExperienceProps, ProjectProps } from "./types";
import Contact from "./components/Contact";
import config from "./config";
import Navigation from "./components/Navigation";
function App() {
	const [projects, setProjects] = useState<ProjectProps[]>([]);
	const [experiences, setExperiences] = useState<ExperienceProps[]>([]);
	const [activePage, setActivePage] = useState("projects");
	const [isEditMode, setIsEditMode] = useState(false);
	function HandleEditMode(event: React.ChangeEvent<HTMLInputElement>) {
		switch (event.target.checked) {
			case true:
				setIsEditMode(true);
				break;
			case false:
				setIsEditMode(false);
				break;
		}
	}
	function fetchProjectData() {
		fetch(new URL(`${config.apiAddress}:${config.apiPort}/api/projects`))
			.then((res) => res.json())
			.then((res: ProjectProps[]) => setProjects(res));
	}
	function putProjectData(project: ProjectProps) {
		fetch(new URL(`${config.apiAddress}:${config.apiPort}/api/projects`), {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(project),
		}).then(() => {
			fetchProjectData();
		});
	}
	function removeProjectData(id: ReturnType<typeof crypto.randomUUID>) {
		fetch(new URL(`${config.apiAddress}:${config.apiPort}/api/projects/${id}`), {
			method: "DELETE",
		}).then((res) => {
			if (res.status !== 204) {
				throw new Error("Something went wrong while deleting the project");
			}
			fetchProjectData();
		});
	}
	function fetchExperienceData() {
		fetch(new URL(`${config.apiAddress}:${config.apiPort}/api/experiences`))
			.then((res) => res.json())
			.then((res: ExperienceProps[]) => setExperiences(res));
	}
	useEffect(() => {
		fetchProjectData();
		fetchExperienceData();
	}, []);
	function ProjectFormSubmittedHandler(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.target as HTMLFormElement | null;
		if (!form) return;
		const formData = new FormData(form);
		let project: ProjectProps = {
			id: crypto.randomUUID(),
			name: formData.get("name") as string,
			description: (formData.get("description") as string) || undefined,
			date: new Date(formData.get("date") as string),
			images: [],
			categories: [formData.get("category") as string],
		};
		try {
			project.url = new URL(formData.get("url") as string);
		} catch (error) {}
		try {
			project.images = [new URL(formData.get("image-url") as string)];
		} catch (error) {}
		HandleProjectMutation("add", project);
	}
	function HandleProjectMutation(action: Action, project: ProjectProps) {
		switch (action) {
			case "add":
				putProjectData(project);
				break;
			case "remove":
				removeProjectData(project.id);
				break;
			default:
				break;
		}
	}
	function PageAnchorClickedHandler(page: string): void {
		setActivePage(page);
	}
	function MessageSentHandler(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		form.querySelector("pre")!.innerHTML = JSON.stringify(
			{
				name: formData.get("contact-name"),
				message: formData.get("contact-message"),
			},
			null,
			2
		);
	}
	return (
		<>
			<header>
				<Navigation onPageAnchorClicked={PageAnchorClickedHandler}>
					<label htmlFor="edit-mode-switch" id="edit-mode-switch-wrapper">
						<span>Edit mode</span>
						<input
							type="checkbox"
							onChange={(event) => HandleEditMode(event)}
							role="switch"
							id="edit-mode-switch"
						/>
					</label>
				</Navigation>
			</header>
			<main>
				{activePage == "createProject" ? (
					<CreateProjectForm onCreateProjectFormSubmitted={ProjectFormSubmittedHandler} />
				) : activePage == "contact" ? (
					<Contact email="funkyemail@sjokoladesma.sj" onSendMessageFormSubmitted={MessageSentHandler}>
						<h1>Contact</h1>
					</Contact>
				) : (
					<>
						<Experiences experiences={experiences}>
							<h1>Experiences</h1>
						</Experiences>
						<Projects
							projects={projects}
							handleProjectMutation={HandleProjectMutation}
							isEditMode={isEditMode}
						>
							<h1>Projects</h1>
						</Projects>
						<CreateProjectForm onCreateProjectFormSubmitted={ProjectFormSubmittedHandler} />
						<Contact email="funkyemail@sjokoladesma.sj" onSendMessageFormSubmitted={MessageSentHandler}>
							<h1>Contact</h1>
						</Contact>
					</>
				)}
			</main>
			<PageFooter />
		</>
	);
}

export default App;
