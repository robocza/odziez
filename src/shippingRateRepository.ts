import shippingRatesDataProd from './data/shipping_rates.prod.json';
import shippingRatesDataStaging from './data/shipping_rates.staging.json';
import shippingRatesDataDev from './data/shipping_rates.dev.json';

interface ShippingRate {
    id: string;
}

function getShippingRatesData(): ShippingRate[] {
    switch (import.meta.env.PUBLIC_APP_ENV) {
        case 'prod':
            return shippingRatesDataProd;
        case 'staging':
            return shippingRatesDataStaging;
        case 'dev':
            return shippingRatesDataDev;
        default:
            throw new Error(`Invalid PUBLIC_APP_ENV "${import.meta.env.PUBLIC_APP_ENV}"`);
    }
}

const shippingRates: ShippingRate[] = getShippingRatesData();

export function allEnabled(): ShippingRate[] {
    return shippingRates;
}
