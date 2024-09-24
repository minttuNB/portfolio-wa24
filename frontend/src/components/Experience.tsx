import { ExperienceProps } from "../types";

export default function Experience(props: ExperienceProps) {
	return (
		<article>
			<h2>{props.name}</h2>
			<p>{props.description}</p>
			{props.toDate
				? (<p>📅 {props.fromDate.toDateString()}-{props.toDate.toDateString()}</p>)
				: (<p>📅 from {props.fromDate.toDateString()}</p>)}
		</article>
	);
}
