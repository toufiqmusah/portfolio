import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Fix: Cast process to any to avoid type error about cwd() missing
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    // IMPORTANT: Change this to '/<REPO_NAME>/' for GitHub Pages
    // e.g. if your repo is 'my-portfolio', use '/my-portfolio/'
    // If this is a custom domain (toufiqmusah.github.io), use '/'
    base: '/', 
    define: {
      // This allows process.env.API_KEY to work in the browser
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});