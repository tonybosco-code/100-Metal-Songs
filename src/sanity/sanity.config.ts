// src/sanity/sanity.config.ts
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "100 Metal Songs",

  // ← use your existing env vars
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  // where Studio mounts
  basePath: "/studio",

  plugins: [
    deskTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
