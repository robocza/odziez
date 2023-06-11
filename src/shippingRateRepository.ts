import productsData from './data/shipping_rates.dist.json';

interface ShippingRate {
    id: string;
}

const shippingRates: ShippingRate[] = productsData as ShippingRate[];

export function allEnabled(): ShippingRate[] {
    return shippingRates;
}
