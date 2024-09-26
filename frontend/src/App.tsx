import { FormEvent, useEffect, useState } from "react";
import CreateProjectForm from "./components/CreateProjectForm";
import Experiences from "./components/Experiences";
import PageFooter from "./components/PageFooter";
import PageHeader from "./components/PageHeader";
import Projects from "./components/Projects";
import { Action, ExperienceProps, ProjectProps } from "./types";
import Contact from "./components/Contact";
import config from "./config";
const experiences: ExperienceProps[] = [
	{
		id: "96e74e93-d91a-4ada-9b9c-2baf5947c390",
		name: "Funky worky",
		description: "Hehe, worked lots",
		fromDate: new Date("2024-09-20T15:21:20.442Z"),
		toDate: new Date("2024-09-24T15:21:20.442Z"),
	},
];
function App() {
	const [projects, setProjects] = useState<ProjectProps[]>([]);
	const [activePage, setActivePage] = useState("projects");
	function fetchProjectData() {
		fetch(new URL(`${config.apiAddress}:${config.apiPort}/api/projects`))
			.then((res) => res.json())
			.then((res: ProjectProps[]) => setProjects(res));
	}
	function putProjectData(project: ProjectProps) {
		console.log(JSON.stringify(project));
		fetch(new URL(`${config.apiAddress}:${config.apiPort}/api/projects`), {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(project),
		}).then((res) => res.json());
	}
	useEffect(() => {
		fetchProjectData();
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
				fetchProjectData();
				break;
			case "remove":
				removeProject(project.id);
				fetchProjectData();
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
			<PageHeader onPageAnchorClicked={PageAnchorClickedHandler} />
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
						<Projects projects={projects} handleProjectMutation={HandleProjectMutation}>
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
