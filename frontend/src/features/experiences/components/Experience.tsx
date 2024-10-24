import { getISODateString } from "../../../lib/formatters";
import { ExperienceProps } from "../types";
export default function Experience(props: ExperienceProps) {
	return (
		<article>
			<h2>{props.name}</h2>
			<p>{props.description}</p>
			{props.toDate ? (
				<p>
					📅 {getISODateString(new Date(props.fromDate))} — {getISODateString(new Date(props.toDate))}
				</p>
			) : (
				<p>📅 from {getISODateString(new Date(props.fromDate))}</p>
			)}
		</article>
	);
}
