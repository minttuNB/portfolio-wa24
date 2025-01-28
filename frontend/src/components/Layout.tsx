import { PropsWithChildren, useState } from "react";
import Navigation from "./Navigation";
import PageFooter from "./PageFooter";
import { PortfolioContextType, usePortfolioContext } from "../contexts/PortfolioContext";

type LayoutProps = PropsWithChildren;
export default function Layout(props: LayoutProps) {
	const [activePage, setActivePage] = useState("projects");
	const { setIsEditMode } = usePortfolioContext() as PortfolioContextType;
	function PageAnchorClickedHandler(page: string): void {
		setActivePage(page);
	}
	function EditModeHandler(event: React.ChangeEvent<HTMLInputElement>) {
		setIsEditMode(event.target.checked);
	}
	return (
		<>
			<header>
				<Navigation onPageAnchorClicked={PageAnchorClickedHandler}>
					<label htmlFor="edit-mode-switch" className="switch-wrapper">
						<span>Edit mode</span>
						<input
							type="checkbox"
							onChange={(event) => EditModeHandler(event)}
							role="switch"
							id="edit-mode-switch"
						/>
					</label>
				</Navigation>
			</header>
			{props.children}
			<PageFooter></PageFooter>
		</>
	);
}
