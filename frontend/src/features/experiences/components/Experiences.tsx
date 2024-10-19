import { PropsWithChildren } from "react";
import { ExperiencesProps } from "../../../types";
import Experience from "./Experience";

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
						/>
					))
				) : (
					<p>No known experiences.</p>
				)}
			</section>
		</>
	);
}
