import { defineConfig } from "astro/config";
// import netlify from '@astrojs/netlify/functions';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
    // output: 'server',
    // adapter: netlify(),
    server: {
        allowedHosts: true,
        host: true,
        port: 3000,
    },
    site: 'https://odziez.robocza.org',
    integrations: [tailwind(), vue()],
    vite: {
        server: {
            watch: {
                ignored: ['**/.idea/workspace.xml'],
            },
        },
    },
});
