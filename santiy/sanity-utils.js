import { createClient, groq } from "next-sanity";

const client = createClient({
  projectId: "saau1ctb",
  dataset: "production",
  apiVersion: "2023-09-26",
});

export async function getHeader() {
  return client.fetch(
    groq`*[_type == "header"]|order(orderRank){"image": image.asset->{...}}`
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
        "images": images[].asset->{...},
  }`
  );
}

export async function getAbout() {
  return client.fetch(
    groq`*[_type == "about"]{
      "image": image.asset->url,
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
