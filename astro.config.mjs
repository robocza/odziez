import { defineConfig } from 'astro/config';
// import netlify from '@astrojs/netlify/functions';
import { searchForWorkspaceRoot } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
    // output: 'server',
    // adapter: netlify(),
    server: {
        allowedHosts: true,
        port: 3000,
    },
    site: 'https://odziez.robocza.org',
    integrations: [vue()],
    vite: {
        plugins: [tailwindcss()],
        server: {
            fs: {
                allow: [searchForWorkspaceRoot(process.cwd())],
            },
            watch: {
                ignored: ['**/.idea/workspace.xml'],
            },
        },
    },
});
