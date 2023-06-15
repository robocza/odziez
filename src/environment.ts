import process from 'process';

type Environment = 'prod' | 'staging' | 'dev';

export function currentEnvironment(): Environment {
    if (import.meta.env !== undefined) {
        return import.meta.env.PUBLIC_APP_ENV;
    }

    return process.env.PUBLIC_APP_ENV as Environment;
}
