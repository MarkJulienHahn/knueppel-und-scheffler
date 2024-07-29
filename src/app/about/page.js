import {
  getHeader,
  getProjects,
  getAbout,
  getClients,
  getJobs,
  getContact,
  getImprint,
  getPrivacy
} from "../../../santiy/sanity-utils";

import Main from "../../../components/Main";

export const metadata = {
  title: "KNUEPPEL & SCHEFFLER",
  description:
    "Full-service event agency for event management, event organization, event coordination, guest management, guest relations, guest services, and invitation management in Berlin.",
};

export default async function Page() {
  const header = await getHeader();
  const projects = await getProjects();
  const about = await getAbout();
  const clients = await getClients();
  const jobs = await getJobs();
  const contact = await getContact();
  const imprint = await getImprint();
  const privacy = await getPrivacy();

  return (
    <div>
      <Main
        header={header}
        projects={projects}
        about={about[0]}
        clients={clients}
        jobs={jobs}
        contact={contact[0]}
        imprint={imprint}
        privacy={privacy}
        aboutPage={true}
      />
    </div>
  );
}

export const revalidate = 60;
