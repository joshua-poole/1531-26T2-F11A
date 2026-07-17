import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Disable file parallelism (different test files to reference shared data)
    // https://vitest.dev/guide/parallelism.html#file-parallelism
    fileParallelism: false,
  },
})
