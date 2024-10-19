import { useEffect, useState } from "react";
import Experiences from "./features/experiences/components/Experiences";
import { ExperienceProps } from "./types";
import config from "./config";
import Layout from "./components/Layout";
import ProjectsPage from "./components/ProjectsPage";
import { PortfolioContextProvider, PortfolioContextType, usePortfolioContext } from "./contexts/PortfolioContext";

function App() {
	const [experiences, setExperiences] = useState<ExperienceProps[]>([]);
	function fetchExperienceData() {
		fetch(new URL(`${config.apiAddress}:${config.apiPort}/api/experiences`))
			.then((res) => res.json())
			.then((res: ExperienceProps[]) => setExperiences(res));
	}
	useEffect(() => {
		fetchExperienceData();
	}, []);

	return (
		<>
			<PortfolioContextProvider value={usePortfolioContext() as PortfolioContextType}>
				<Layout>
					<main>
						<Experiences experiences={experiences}>
							<h1>Experiences</h1>
						</Experiences>
						<ProjectsPage />
					</main>
				</Layout>
			</PortfolioContextProvider>
		</>
	);
}

export default App;
