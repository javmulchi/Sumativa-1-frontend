import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// En GitHub Pages, Vite necesita conocer el nombre del repositorio.
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base = process.env.GITHUB_ACTIONS && repositoryName
  ? `/${repositoryName}/`
  : '/';

export default defineConfig({
  plugins: [react()],
  base,
});
