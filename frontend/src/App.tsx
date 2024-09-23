import PageFooter from "./components/PageFooter";
import PageHeader from "./components/PageHeader";
import Projects from "./components/Projects";
import { ProjectProps } from "./types";
const projects: ProjectProps[] = [
	{
	  id: "aedca1bf-2aab-40fc-b007-868f435acdaf",
	  name: "Project 1",
	  description: "Sample project description",
	  date: new Date("Year or a more definite date of project work/completion"),
	  url: new URL("https://example.project.party/fantastic"),
	  images: [
		new URL("path_to_image_1_can_be_used_as_splash.png"),
		new URL("path_to_eventual_image_2_3_4_if_we_want_a_full_project_page.jpg")
	  ]
	},
	{
	  id: "1a111f0d-b1bd-4a7a-ab61-696597bef59d",
	  name: "ppcat",
	  description: "My first Electron project, bringing to life the popular at the time Bongo Cat as an overlay for streamers. Supports keyboard + mouse, keyboard + drawing tablet or keyboard only.",
	  date: new Date("2018-09-17T00:00:00.000Z"),
	  url: new URL("https://github.com/minttuNB/ppcat"),
	  images: [
		new URL("https://upload.wikimedia.org/wikipedia/en/7/7a/Bongo_cat.png")
	  ]
	},
	{
	  id: "543dcd97-45a9-4a51-a28b-81d0c0e5fe39",
	  name: "Tourtle",
	  description: "A project created for the subject Software Engineering and Testing during my time at HiØ. A webapp prototype made to connect local private and organized tourism activities providers with interested tourists. Written in Java with Javalin.",
	  date: new Date("2023-11-27T00:00:00.000Z"),
	  images: [
		new URL("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Emoji_u1f422.svg/1200px-Emoji_u1f422.svg.png")
	  ]
	}
  ];
function App() {
	return (
		<>
			<PageHeader/>
			<main>
				<Projects projects={projects}/>
			</main>
			<PageFooter/>
		</>
	);
}

export default App;
