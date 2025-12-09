import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    define: {
      // Vital for using process.env.API_KEY in client-side code hosted on Vercel
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});