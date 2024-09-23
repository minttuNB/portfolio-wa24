import Project from "./Project";
import { ProjectProps, ProjectsProps } from "../types";

export default function Projects(props: ProjectsProps) {
	return (
		<section id="projects">
			{props.projects.map((project: ProjectProps) => (
				<Project
					id={project.id}
					name={project.name}
					description={project.description}
					date={project.date}
					url={project.url}
					images={project.images}
					key={project.id}
				/>
			))}
		</section>
	);
}
