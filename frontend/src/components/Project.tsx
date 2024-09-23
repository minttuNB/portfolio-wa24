import { ProjectProps } from "../types";

export default function Project(props: ProjectProps) {
	let image;
	let { description } = props;
	if(!props.images){
		image = <img src="https://via.placeholder.com/300" alt={props.name}></img>;
	}
	else{
		image = <img src={props.images[0].toString()} alt={props.name}></img>;
	}
	if(!description){
		description = "<i>No description provided</i>";
	}
	return (
		<article>
			{image}
			<section>
				<h2>{props.name}</h2>
				<p>{description}</p>
				<a className="link-button" href={props.url?.toString()}>Learn more</a>
			</section>
		</article>
	);
}