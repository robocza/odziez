/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
        './node_modules/flowbite/**/*.js'
    ],
    theme: {
        extend: {
            fontFamily: {
                pixel: ['FKRasterGroteskCompact', ...defaultTheme.fontFamily.mono],
                sans: ['GT America', ...defaultTheme.fontFamily.sans],
                serif: ['Jazzier', ...defaultTheme.fontFamily.serif]
            },
        },
    },
    plugins: [
        require('flowbite/plugin')
    ],
};
