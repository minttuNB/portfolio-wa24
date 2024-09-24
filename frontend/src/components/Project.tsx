import { ProjectProps } from "../types";

export default function Project(props: ProjectProps) {
	return (
		<article>
			{!props.images ? (
				<img
					src="https://via.placeholder.com/300"
					alt={props.name}
				></img>
			) : (
				<img src={props.images[0].toString()} alt={props.name}></img>
			)}
			<section>
				<h2>{props.name}</h2>
				{props.description ? (
					<p>{props.description}</p>
				) : (
					<i>No description provided</i>
				)}
				<a className="link-button" href={props.url?.toString()}>
					Learn more
				</a>
			</section>
		</article>
	);
}