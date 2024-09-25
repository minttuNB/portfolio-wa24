export type PageHeaderProps = {
	onPageAnchorClicked: (event: React.MouseEvent<HTMLAnchorElement>, page: string) => void;
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
						<a onClick={(event) => {
							onPageAnchorClicked(event, "projects")
						}}>Projects</a>
					</li>
					{/* <li>
						<a onClick={(event) => {
							onPageAnchorClicked(event, "createProject")
						}}>Create project</a>
					</li>
					<li>
						<a onClick={(event) => {
							onPageAnchorClicked(event, "contact")
						}}>Contact</a>
					</li> */}
				</menu>
			</nav>
		</header>
	);
}
