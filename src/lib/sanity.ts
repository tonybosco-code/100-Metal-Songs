import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: '2025-01-01', // or your preferred date
  token: process.env.SANITY_API_TOKEN, // required for writes
  useCdn: false,
});
