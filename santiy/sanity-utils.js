import { createClient, groq } from "next-sanity";

const client = createClient({
  projectId: "saau1ctb",
  dataset: "production",
  apiVersion: "2023-09-26",
});

export default client;

export async function getHeader() {
  return client.fetch(
    groq`*[_type == "header"]|order(orderRank){"image": image{crop, hotspot, credit, "asset": asset->{...}}}`
  );
}

export async function getProjects() {
  return client.fetch(
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
}

export async function getAbout() {
  return client.fetch(
    groq`*[_type == "about"]{
      "aboutImage": aboutImage{alt, credit, "url": asset->{url}},
      "clientsImage": clientsImage{alt, credit, "url": asset->{url}},
      "jobsImage": jobsImage{alt, credit, "url": asset->{url}}, textDe, textEn}`
  );
}

export async function getClients() {
  return client.fetch(
    groq`*[_type == "kunden"]| order(lower(client) asc){...}`
  );
}

export async function getJobs() {
  return client.fetch(groq`*[_type == "jobs"]|order(orderRank){...}`);
}

export async function getContact() {
  return client.fetch(groq`*[_type == "contact"]{...}`);
}

export async function getImprint() {
  return client.fetch(groq`*[_type == "imprint"]{...}`);
}

export async function getPrivacy() {
  return client.fetch(groq`*[_type == "privacy"]{...}`);
}
