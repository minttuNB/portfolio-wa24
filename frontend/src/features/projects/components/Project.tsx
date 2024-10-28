import { PropsWithChildren } from "react";
import { ProjectProps } from "../types";

export default function Project(props: Readonly<PropsWithChildren<ProjectProps>>) {
	return (
		<article>
			{!props.images ? (
				<img src="https://via.placeholder.com/300" alt={props.name}></img>
			) : (
				<img src={props.images[0].toString()} alt={props.name}></img>
			)}
			<section>
				<h2>{props.name}</h2>
				{props.description ? <p contentEditable>{props.description}</p> : <i>No description provided</i>}
				{props.url ? (
					<a className="link-button" href={props.url?.toString()}>
						Learn more
					</a>
				) : null}
				{props.categories && props.categories.length > 0 ? (
					<p>Categories: {props.categories?.join(", ")}</p>
				) : null}
			</section>
			{props.children}
		</article>
	);
}
