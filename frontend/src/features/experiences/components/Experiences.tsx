import { PropsWithChildren } from "react";
import Experience from "./Experience";
import { ExperiencesProps } from "../types";

export default function Experiences(props: Readonly<PropsWithChildren<ExperiencesProps>>) {
	return (
		<>
			{props.children}
			<section id="experiences">
				{props.experiences.length > 0 ? (
					props.experiences.map((experience) => (
						<Experience
							id={experience.id}
							name={experience.name}
							description={experience.description}
							fromDate={experience.fromDate}
							toDate={experience.toDate}
							key={experience.id}
							published={experience.published}
							createdAt={experience.createdAt}
						/>
					))
				) : (
					<p>No known experiences.</p>
				)}
			</section>
		</>
	);
}
