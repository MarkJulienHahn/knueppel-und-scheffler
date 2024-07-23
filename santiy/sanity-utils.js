import { createClient, groq } from 'next-sanity';

const client = createClient({
  projectId: 'saau1ctb',
  dataset: 'production',
  apiVersion: '2023-09-26',
  useCdn: true, // Use CDN for faster response times
});

export default client;

export async function getHeader() {
  try {
    return await client.fetch(
      groq`*[_type == "header"]|order(orderRank){"image": image{crop, hotspot, credit, "asset": asset->{...}}}`
    );
  } catch (error) {
    console.error('Error fetching header:', error);
    throw new Error('Failed to fetch header');
  }
}

export async function getProjects() {
  try {
    return await client.fetch(
      groq`*[_type == "projects"]|order(orderRank){
        _id, 
        _createdAt,
        name,
        "slug": slug.current,
        "image": image{crop, hotspot, alt, credit, "asset": asset->{...}},
        textEn, textDe,
        "images": images[]{crop, hotspot, alt, credit, "asset": asset->{...}}
      }`
    );
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
}

export async function getAbout() {
  try {
    return await client.fetch(
      groq`*[_type == "about"]{
        "aboutImage": aboutImage{alt, credit, "url": asset->{url}},
        "clientsImage": clientsImage{alt, credit, "url": asset->{url}},
        "jobsImage": jobsImage{alt, credit, "url": asset->{url}}, 
        textDe, textEn
      }`
    );
  } catch (error) {
    console.error('Error fetching about:', error);
    throw new Error('Failed to fetch about');
  }
}

export async function getClients() {
  try {
    return await client.fetch(
      groq`*[_type == "kunden"]| order(lower(client) asc){...}`
    );
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw new Error('Failed to fetch clients');
  }
}

export async function getJobs() {
  try {
    return await client.fetch(groq`*[_type == "jobs"]|order(orderRank){...}`);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw new Error('Failed to fetch jobs');
  }
}

export async function getContact() {
  try {
    return await client.fetch(groq`*[_type == "contact"]{...}`);
  } catch (error) {
    console.error('Error fetching contact:', error);
    throw new Error('Failed to fetch contact');
  }
}

export async function getImprint() {
  try {
    return await client.fetch(groq`*[_type == "imprint"]{...}`);
  } catch (error) {
    console.error('Error fetching imprint:', error);
    throw new Error('Failed to fetch imprint');
  }
}

export async function getPrivacy() {
  try {
    return await client.fetch(groq`*[_type == "privacy"]{...}`);
  } catch (error) {
    console.error('Error fetching privacy:', error);
    throw new Error('Failed to fetch privacy');
  }
}

export async function getDeleted() {
  try {
    return await client.fetch(groq`*[_type == "projects" && slug.current == "bunte-new-faces-awards-film-2024"]{_id}`);
  } catch (error) {
    console.error('Error fetching deleted projects:', error);
    throw new Error('Failed to fetch deleted projects');
  }
}
