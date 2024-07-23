import { createClient, groq } from "next-sanity";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 600 }); // Cache TTL set to 10 minutes

const client = createClient({
  projectId: "saau1ctb",
  dataset: "production",
  apiVersion: "2023-09-26",
});

export default client;

const fetchWithCache = async (key, query) => {
  if (cache.has(key)) {
    return cache.get(key);
  }

  const data = await client.fetch(query);
  cache.set(key, data);
  return data;
};

export async function getHeader() {
  const query = groq`*[_type == "header"]|order(orderRank){"image": image{crop, hotspot, credit, "asset": asset->{...}}}`;
  return fetchWithCache("header", query);
}

export async function getProjects() {
  const query = groq`*[_type == "projects"]|order(orderRank){
    _id, 
    _createdAt,
    name,
    "slug": slug.current,
    "image": image{crop, hotspot, alt, credit, "asset": asset->{...}},
    textEn, textDe,
    "images": images[]{crop, hotspot, alt, credit, "asset": asset->{...}}
  }`;
  return fetchWithCache("projects", query);
}

export async function getAbout() {
  const query = groq`*[_type == "about"]{
    "aboutImage": aboutImage{alt, credit, "url": asset->{url}},
    "clientsImage": clientsImage{alt, credit, "url": asset->{url}},
    "jobsImage": jobsImage{alt, credit, "url": asset->{url}}, textDe, textEn
  }`;
  return fetchWithCache("about", query);
}

export async function getClients() {
  const query = groq`*[_type == "kunden"]| order(lower(client) asc){...}`;
  return fetchWithCache("clients", query);
}

export async function getJobs() {
  const query = groq`*[_type == "jobs"]|order(orderRank){...}`;
  return fetchWithCache("jobs", query);
}

export async function getContact() {
  const query = groq`*[_type == "contact"]{...}`;
  return fetchWithCache("contact", query);
}

export async function getImprint() {
  const query = groq`*[_type == "imprint"]{...}`;
  return fetchWithCache("imprint", query);
}

export async function getPrivacy() {
  const query = groq`*[_type == "privacy"]{...}`;
  return fetchWithCache("privacy", query);
}

export async function getDeleted() {
  const query = groq`*[_type == "projects" && slug.current == "bunte-new-faces-awards-film-2024"]{_id}`;
  return fetchWithCache("deleted", query);
}

