export type PageHeaderProps = {
	onPageAnchorClicked: (page: string) => void;
};
export default function PageHeader(props: PageHeaderProps) {
	const { onPageAnchorClicked } = props;
	return (
		<header>
			<nav>
				<a id="logo" href="/">
					<img src="" alt="Logo" />
				</a>
				<menu>
					<li>
						<a onClick={() => {
							onPageAnchorClicked("projects")
						}}>Projects</a>
					</li>
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
		</header>
	);
}
