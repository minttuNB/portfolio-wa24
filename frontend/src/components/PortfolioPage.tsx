import { FormEvent } from "react";
import useProjects from "../features/projects/hooks/useProjects";
import { Action } from "../types";
import Contact from "./Contact";
import CreateProjectForm from "./CreateProjectForm";
import Projects from "../features/projects/components/Projects";
import { PortfolioContextType, usePortfolioContext } from "../contexts/PortfolioContext";
import Experiences from "../features/experiences/components/Experiences";
import useExperiences from "../features/experiences/hooks/useExperiences";
import { ProjectProps } from "../features/projects/types";
import { projectSchema } from "../features/projects/lib/validate";
export default function PortfolioPage() {
	const { add, update, remove, publish, unpublish, projects, isError, isLoading, error } = useProjects();
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
			case "publish":
				publish(project.id!);
				break;
			case "unpublish":
				unpublish(project.id!);
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
		let project;
		try {
			project = projectSchema
				.partial({ id: true, description: true, date: true, images: true, url: true, published: true })
				.parse({
					name: formData.get("name")?.toString(),
					description: formData.get("description")?.toString(),
					date:
						formData.get("date") !== ""
							? new Date(formData.get("date")!.toString()).toISOString()
							: undefined,
					url: formData.get("url") ? formData.get("url")?.toString() : undefined,
					images: formData.get("image-url") ? [formData.get("image-url")?.toString()] : [],
					categories: formData.get("category") ? [formData.get("category")?.toString()] : [],
				});
		} catch (error) {
			alert("An error has occured while creating the project: invalid project data.");
			return;
		}
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
