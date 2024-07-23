'use client';

import React, { useState, useEffect } from 'react';
import {
  getProjects,
  getImprint,
  getPrivacy,
} from '../../../santiy/sanity-utils';
import ProjectSingle from '../../../components/project/ProjectSingle';

export async function getStaticPaths() {
  // Fetch all possible slugs from your data source (e.g., Sanity)
  const projects = await getProjects();
  const paths = projects.map((project) => ({
    params: { slug: project.slug },
  }));

  return { paths, fallback: false };
}

export default function Page({ params }) {
  const [projects, setProjects] = useState(null);
  const [imprint, setImprint] = useState(null);
  const [privacy, setPrivacy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    async function fetchData() {
      try {
        const projectsData = await getProjects();
        const imprintData = await getImprint();
        const privacyData = await getPrivacy();

        setProjects(projectsData);
        setImprint(imprintData);
        setPrivacy(privacyData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
