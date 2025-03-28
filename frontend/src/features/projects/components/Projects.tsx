import { ProjectProps, ProjectsProps } from "../types";
import Project from "./Project";
import { PropsWithChildren } from "react";

export default function Projects(props: Readonly<PropsWithChildren<ProjectsProps>>) {
	return (
		<>
			{props.children}
			<section id="projects">
				{props.projects.length > 0 ? (
					props.projects.map((project: ProjectProps) => (
						<Project
							key={project.id}
							id={project.id}
							name={project.name}
							description={project.description}
							date={project.date}
							url={project.url}
							images={project.images}
							categories={project.categories}
							published={project.published}
							createdAt={project.createdAt}
						>
							<div className={props.isEditMode ? "edit-controls" : "edit-controls invisible"}>
								<label htmlFor="publish-switch" className="switch-wrapper">
									<span>Publish</span>
									<input
										type="checkbox"
										onChange={() => {
											props.handleProjectMutation(
												project.published ? "unpublish" : "publish",
												project
											);
										}}
										role="switch"
										className="publish-switch"
										defaultChecked={project.published}
									/>
								</label>
								<button
									className="remove-button"
									title="Remove project"
									onClick={() => {
										if (confirm(`Do you really want to remove the project ${project.name}?`))
											props.handleProjectMutation("remove", project);
									}}
								>
									X
								</button>
							</div>
						</Project>
					))
				) : (
					<p>No known projects.</p>
				)}
			</section>
			<section id="category-counter">
				<h3>Total in categories:</h3>
				<section className="categories">
					{Object.entries(
						props.projects.reduce((acc, current) => {
							if (current.categories) {
								for (const category of current.categories) {
									acc[category] = (acc[category] || 0) + 1;
								}
							}
							return acc;
						}, {} as Record<string, number>)
					)
						.sort((el1, el2) => el2[1] - el1[1])
						.map((category) => {
							return (
								<span key={category[0]} className="category-box">
									{category[0]}: {category[1]}
								</span>
							);
						})}
				</section>
			</section>
		</>
	);
}
