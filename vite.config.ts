import { configDefaults, defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'template/*'],
    coverage: {
      reportsDirectory: './tests/unit/coverage',
      all: true,
      excludeNodeModules: true,
      exclude: ['tests/**'],
    },
  },
})
