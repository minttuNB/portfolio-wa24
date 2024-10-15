import { PropsWithChildren } from "react";

export type NavigationProps = {
	onPageAnchorClicked: (page: string) => void;
};
export default function Navigation(props: Readonly<PropsWithChildren<NavigationProps>>) {
	const { onPageAnchorClicked } = props;
	return (
		<nav>
			<a id="logo" href="/">
				<img src="" alt="Logo" />
			</a>
			<menu>
				<li>
					<a
						onClick={() => {
							onPageAnchorClicked("projects");
						}}
					>
						Projects
					</a>
				</li>
				{props.children}
				{/* <li>
						<a onClick={() => {
							onPageAnchorClicked("createProject")
						}}>Create project</a>
					</li>
					<li>
						<a onClick={() => {
							onPageAnchorClicked("contact")
						}}>Contact</a>
					</li> */}
			</menu>
		</nav>
	);
}
