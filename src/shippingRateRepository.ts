import shippingRatesDataProd from './data/shipping_rates.prod.json';
import shippingRatesDataStaging from './data/shipping_rates.staging.json';
import shippingRatesDataDev from './data/shipping_rates.dev.json';
import { currentEnvironment } from './environment';

interface ShippingRate {
    id: string;
}

function getShippingRatesData(): ShippingRate[] {
    const env = currentEnvironment();

    switch (env) {
        case 'prod':
            return shippingRatesDataProd;
        case 'staging':
            return shippingRatesDataStaging;
        case 'dev':
            return shippingRatesDataDev;
        default:
            throw new Error(`Invalid PUBLIC_APP_ENV "${env}"`);
    }
}

const shippingRates: ShippingRate[] = getShippingRatesData();

export function allEnabled(): ShippingRate[] {
    return shippingRates;
}
