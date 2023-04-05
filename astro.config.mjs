import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
    site: "https://odziez.robocza.org",
    integrations: [
        tailwind(),
        vue(),
    ],
    vite: {
        server: {
            watch: {
                ignored: ['**/.idea/workspace.xml']
            }
        }
    }
});
