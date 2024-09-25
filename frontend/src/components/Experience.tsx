import { ExperienceProps } from "../types";

export default function Experience(props: ExperienceProps) {
	return (
		<article>
			<h2>{props.name}</h2>
			<p>{props.description}</p>
			{props.toDate
				? (<p>📅 {props.fromDate.toISOString().split("T")[0]} — {props.toDate.toISOString().split("T")[0]}</p>)
				: (<p>📅 from {props.fromDate.toISOString().split("T")[0]}</p>)}
		</article>
	);
}
