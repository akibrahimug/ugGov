import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { allSchemaTypes } from '@ug-gov/content-schemas';
import { deskStructure } from './src/deskStructure';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? 'REPLACE_ME';
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production';

export default defineConfig({
  name: 'uggov-studio',
  title: 'GOV.UG Publishing Studio',
  projectId,
  dataset,
  plugins: [structureTool({ structure: deskStructure }), visionTool()],
  schema: { types: allSchemaTypes },
});
