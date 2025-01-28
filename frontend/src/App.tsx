import Layout from "./components/Layout";
import PortfolioPage from "./components/PortfolioPage";
import { PortfolioContextProvider, PortfolioContextType, usePortfolioContext } from "./contexts/PortfolioContext";

function App() {
	return (
		<>
			<PortfolioContextProvider value={usePortfolioContext() as PortfolioContextType}>
				<Layout>
					<main>
						<PortfolioPage />
					</main>
				</Layout>
			</PortfolioContextProvider>
		</>
	);
}

export default App;
