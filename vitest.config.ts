import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import { qwikVite } from '@builder.io/qwik/optimizer'
import { qwikReact } from '@builder.io/qwik-react/vite'

export default defineConfig({
  plugins: [qwikVite(), qwikReact(), tsconfigPaths()],
  test: {
    environment: 'node',
    include: ['src/**/__tests__/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: [
        'src/routes/index.helpers.ts',
        'src/components/ProjectList.helpers.ts',
        'src/integrations/react/Project.helpers.ts',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
})
