/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './node_modules/flowbite/**/*.js'],
    theme: {
        extend: {
            colors: {
                black: '#121212',
                phosphorescent: '#5DF19F',
                green: '#01CE53',
            },
            fontFamily: {
                decorative: ['BDOGrotesk', ...defaultTheme.fontFamily.sans],
                title: ['Pickle', ...defaultTheme.fontFamily.sans],
                sans: ['GT America', ...defaultTheme.fontFamily.sans],
            },
            screens: {
                dawid: '1920px',
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: '#121212',
                    },
                },
            },
        },
    },
    plugins: [require('flowbite/plugin'), require('@tailwindcss/typography')],
};
