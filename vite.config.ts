import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: "/",
    // Removed react() plugin as we are using CDN dependencies and no local React
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});