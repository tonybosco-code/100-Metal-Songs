const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2022-06-01",
  useCdn: true,
};

export default sanityConfig;
