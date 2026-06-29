/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
    environment: 'node',
    globals: true,
    pool: 'forks',
    execArgv: ['--import', 'tsx/esm'],
    isolate: false,
    maxWorkers: 1,
    coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        exclude: ['node_modules/**', 'dist/**']
    }
},

    resolve: {
        conditions: ['node']
    }
});
