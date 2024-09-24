import { ExperiencesProps } from "../types";
import Experience from "./Experience";

export default function Experiences(props: ExperiencesProps) {
	return (
		<section id="experiences">
			{props.experiences.map((experience) => (
				<Experience
					id={experience.id}
					name={experience.name}
					fromDate={experience.fromDate}
					toDate={experience.toDate}
				/>
			))}
		</section>
	);
}
