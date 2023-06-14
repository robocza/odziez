import productsDataDev from './data/products.dev.json';
import productsDataStaging from './data/products.staging.json';
import productsDataProd from './data/products.prod.json';
import {currentEnvironment} from "./environment";
import type { Money } from './money';

interface ProductVariant {
    size: string;
    stripe: {
        productId: string;
        priceId: string;
    };
}

export interface Product {
    id: string;
    name: string;
    images: string[];
    sizes: string[];
    price: Money;
    variants: ProductVariant[];
}

function getProductsData(): Product[] {
    const env = currentEnvironment();

    switch (currentEnvironment()) {
        case 'prod':
            return productsDataProd;
        case 'staging':
            return productsDataStaging;
        case 'dev':
            return productsDataDev;
        default:
            throw new Error(`Invalid PUBLIC_APP_ENV "${env}"`);
    }
}

const products: Product[] = getProductsData();

export function getProduct(id: string): Product {
    const product = products.find((product) => product.id === id);
    if (product === undefined) {
        throw new Error('Product not found.');
    }

    return product;
}

export function getProductVariant(id: string, size: string): ProductVariant {
    const product = getProduct(id);

    const variant = product.variants.find((variant) => variant.size === size);
    if (variant === undefined) {
        throw new Error('Variant not found.');
    }

    return variant;
}
