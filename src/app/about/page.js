import {
  getHeader,
  getProjects,
  getAbout,
  getClients,
  getJobs,
  getImprint,
} from "../../../santiy/sanity-utils";

import Main from "../../../components/Main";

export default async function Page() {
  const header = await getHeader();
  const projects = await getProjects();
  const about = await getAbout();
  const clients = await getClients();
  const jobs = await getJobs();
  const imprint = await getImprint();

  return (
    <div>
      <Main
        header={header}
        projects={projects}
        about={about[0]}
        clients={clients}
        jobs={jobs}
        imprint={imprint}
        aboutPage={true}
      />
    </div>
  );
}
