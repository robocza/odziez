/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly PUBLIC_APP_ENV: 'prod' | 'staging' | 'dev';
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
