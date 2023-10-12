import {
  getHeader,
  getProjects,
  getAbout,
  getClients,
  getJobs,
  getImprint,
  getPrivacy,
} from "../../../santiy/sanity-utils";

import ProjectSingle from "../../../components/project/ProjectSingle";

export default async function Page({ params }) {
  const projects = await getProjects();
  const imprint = await getImprint();
  const privacy = await getPrivacy();
  return (
    <div>
      <ProjectSingle
        projects={projects}
        imprint={imprint}
        privacy={privacy}
        slug={params.slug}
      />
    </div>
  );
}
