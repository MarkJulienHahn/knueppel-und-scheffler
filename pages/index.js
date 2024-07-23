'use client';

import React, { useState, useEffect } from 'react';
import {
  getHeader,
  getProjects,
  getAbout,
  getClients,
  getJobs,
  getContact,
  getImprint,
  getPrivacy,
  getDeleted,
} from '../santiy/sanity-utils';
import Main from '../components/Main';

export default function Page() {
  const [header, setHeader] = useState(null);
  const [projects, setProjects] = useState(null);
  const [about, setAbout] = useState(null);
  const [clients, setClients] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [contact, setContact] = useState(null);
  const [imprint, setImprint] = useState(null);
  const [privacy, setPrivacy] = useState(null);
  const [deleted, setDeleted] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const header = await getHeader();
        const projects = await getProjects();
        const about = await getAbout();
        const clients = await getClients();
        const jobs = await getJobs();
        const contact = await getContact();
        const imprint = await getImprint();
        const privacy = await getPrivacy();
        const deleted = await getDeleted();

        setHeader(header);
        setProjects(projects);
        setAbout(about[0]);
        setClients(clients);
        setJobs(jobs);
        setContact(contact[0]);
        setImprint(imprint);
        setPrivacy(privacy);
        setDeleted(deleted);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Main
        header={header}
        projects={projects}
        about={about}
        clients={clients}
        jobs={jobs}
        contact={contact}
        imprint={imprint}
        privacy={privacy}
      />
    </div>
  );
}
