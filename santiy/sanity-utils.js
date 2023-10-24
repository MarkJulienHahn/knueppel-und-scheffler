import { createClient, groq } from "next-sanity";

const client = createClient({
  projectId: "saau1ctb",
  dataset: "production",
  apiVersion: "2023-09-26",
});

export default client;

export async function getHeader() {
  return client.fetch(
    groq`*[_type == "header"]|order(orderRank){"image": image{crop, hotspot, "asset": asset->{...}}}`
  );
}

export async function getProjects() {
  return client.fetch(
    groq`*[_type == "projects"]|order(orderRank){
      _id, 
      _createdAt,
      name,
      "slug": slug.current,
      "image": image.asset->{...},
      textEn, textDe,
        "images": images[]{crop, hotspot, "asset": asset->{...}}
  }`
  );
}

export async function getAbout() {
  return client.fetch(
    groq`*[_type == "about"]{
      "aboutImage": aboutImage.asset->url,
      "clientsImage": clientsImage.asset->url,
      "jobsImage": jobsImage.asset->url,
      textEn, textDe,
  }`
  );
}

export async function getClients() {
  return client.fetch(
    groq`*[_type == "clients"]| order(lower(client) asc){...}`
  );
}

export async function getJobs() {
  return client.fetch(groq`*[_type == "jobs"]|order(orderRank){...}`);
}

export async function getImprint() {
  return client.fetch(groq`*[_type == "imprint"]{...}`);
}

export async function getPrivacy() {
  return client.fetch(groq`*[_type == "privacy"]{...}`);
}
