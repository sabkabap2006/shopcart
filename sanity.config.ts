'use client'

/**
 * This configuration is used for the Sanity Studio mounted on the `/studio` route.
 */

import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        initial: 'https://your-frontend-url.com', // 🔁 Replace with your actual frontend URL
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
      allowOrigins: ['https://your-frontend-url.com'], // optional: useful for strict CORS in iframe preview
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
