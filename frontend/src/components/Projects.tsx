import Project from "./Project";
import { ProjectProps, ProjectsProps } from "../types";
import { PropsWithChildren } from "react";

export default function Projects(
	props: Readonly<PropsWithChildren<ProjectsProps>>
) {
	return (
		<>
			{props.children}
			<section id="projects">
				{props.projects.length > 0 ? (
					props.projects.map((project: ProjectProps) => (
						<Project
							id={project.id}
							name={project.name}
							description={project.description}
							date={project.date}
							url={project.url}
							images={project.images}
							key={project.id}
						>
							<button
								className="remove-button"
								title="Remove project"
								onClick={() => {
									if (
										confirm(
											`Do you really want to remove the project ${project.name}?`
										)
									)
										props.handleProjectMutation(
											"remove",
											project
										);
								}}
							>
								X
							</button>
						</Project>
					))
				) : (
					<p>No known projects.</p>
				)}
			</section>
		</>
	);
}
