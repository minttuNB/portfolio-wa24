import { ExperienceProps } from "../types";
function getDateString(date: Date) {
	return date.toISOString().split("T")[0];
}
export default function Experience(props: ExperienceProps) {
	return (
		<article>
			<h2>{props.name}</h2>
			<p>{props.description}</p>
			{props.toDate ? (
				<p>
					📅 {getDateString(props.fromDate)} — {getDateString(props.toDate)}
				</p>
			) : (
				<p>📅 from {getDateString(props.fromDate)}</p>
			)}
		</article>
	);
}
