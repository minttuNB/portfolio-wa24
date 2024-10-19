import { FormEvent } from "react";
import useProjects from "../features/projects/useProjects";
import { Action, ProjectProps } from "../types";
import Contact from "./Contact";
import CreateProjectForm from "./CreateProjectForm";
import Experiences from "./Experiences";
import Projects from "./Projects";
type ProjectsPageProps = {};
export default function ProjectsPage(props: ProjectsPageProps) {
	const { add, remove, get, projects, error } = useProjects();
	function HandleProjectMutation(action: Action, project: Partial<ProjectProps>) {
		switch (action) {
			case "add":
				add(project);
				break;
			case "remove":
				remove(project.id!);
				break;
			default:
				break;
		}
	}
	function ProjectFormSubmittedHandler(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.target as HTMLFormElement | null;
		if (!form) return;
		const formData = new FormData(form);
		let project: Partial<ProjectProps> = {
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
			<Projects projects={projects} handleProjectMutation={HandleProjectMutation} isEditMode={isEditMode}>
				<h1>Projects</h1>
			</Projects>
			<CreateProjectForm onCreateProjectFormSubmitted={ProjectFormSubmittedHandler} />
			<Contact email="funkyemail@sjokoladesma.sj" onSendMessageFormSubmitted={MessageSentHandler}>
				<h1>Contact</h1>
			</Contact>
		</>
	);
}
