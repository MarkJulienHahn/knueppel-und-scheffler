import { getProjects } from "../../santiy/sanity-utils";

import Project from "../../components/project/Project";

export default async function Page({ searchParams }) {
  const projects = await getProjects();
  return (
    <div>
      TEST
      {/* <Project
        // lang={lang}
        // setLang={setLang}
        // setShowProject={setShowProject}
        showProject={true}
        projIndex={history.state.query}
        projects={projects}
      /> */}
    </div>
  );
}
