import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Disable file parallelism as different test files reference shared data
    fileParallelism: false,
  },
})