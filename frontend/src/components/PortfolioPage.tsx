import { FormEvent } from "react";
import useProjects from "../features/projects/useProjects";
import { Action, ProjectProps } from "../types";
import Contact from "./Contact";
import CreateProjectForm from "./CreateProjectForm";
import Projects from "../features/projects/components/Projects";
import { PortfolioContextType, usePortfolioContext } from "../contexts/PortfolioContext";
import Experiences from "../features/experiences/components/Experiences";
import useExperiences from "../features/experiences/useExperiences";
export default function PortfolioPage() {
	const { add, update, remove, projects, isError, isLoading, error } = useProjects();
	const {
		experiences,
		isError: isExperienceError,
		isLoading: isExperienceLoading,
		error: experienceError,
	} = useExperiences();
	function HandleProjectMutation(action: Action, project: Partial<ProjectProps>) {
		switch (action) {
			case "add":
				add(project);
				break;
			case "update":
				update(project);
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
	const { isEditMode } = usePortfolioContext() as PortfolioContextType;
	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p className="error-message">{error}</p>;
	return (
		<>
			<Experiences experiences={experiences}>
				<h1>Experiences</h1>
			</Experiences>
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
