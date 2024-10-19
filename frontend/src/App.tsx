import { useEffect, useState } from "react";
import Experiences from "./components/Experiences";
import { ExperienceProps } from "./types";
import config from "./config";
import Layout from "./components/Layout";
import ProjectsPage from "./components/ProjectsPage";
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
			<Layout>
				<main>
					<Experiences experiences={experiences}>
						<h1>Experiences</h1>
					</Experiences>
					<ProjectsPage />
				</main>
			</Layout>
		</>
	);
}

export default App;
