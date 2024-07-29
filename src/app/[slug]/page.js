import {
  getProjects,
  getImprint,
  getPrivacy,
} from "../../../santiy/sanity-utils";

import ProjectSingle from "../../../components/project/ProjectSingle";

export const metadata = {
  title: "KUEPPEL & SCHEFFLER",
  description:
    "Full-service event agency for event management, event organization, event coordination, guest management, guest relations, guest services, and invitation management in Berlin.",
};

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

export const revalidate = 60;
