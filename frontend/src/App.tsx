import Layout from "./components/Layout";
import ProjectsPage from "./components/ProjectsPage";
import { PortfolioContextProvider, PortfolioContextType, usePortfolioContext } from "./contexts/PortfolioContext";

function App() {
	return (
		<>
			<PortfolioContextProvider value={usePortfolioContext() as PortfolioContextType}>
				<Layout>
					<main>
						<ProjectsPage />
					</main>
				</Layout>
			</PortfolioContextProvider>
		</>
	);
}

export default App;
