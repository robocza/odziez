import productsData from './data/products.json';
import productsStripeDataMappingDev from './data/products_stripe_mapping.dev.json';
import productsStripeDataMappingStaging from './data/products_stripe_mapping.staging.json';
import productsStripeDataMappingProd from './data/products_stripe_mapping.prod.json';
import { currentEnvironment } from './environment';
import type { Money } from './money';

interface ProductVariant {
    size: string;
    stripe: {
        productId: string;
        priceId: string;
    };
}

export type SizeChartItem = {
    size: string;
    height: string;
    width: string;
    sleeve: string;
};

export interface Product {
    id: string;
    name: string;
    images: {
        url: string;
        alt: string;
        bigUrl: string;
        width: number;
        height: number;
    }[];
    sizes: string[];
    price: Money;
    variants: ProductVariant[];
    sizeChart: SizeChartItem[];
}

type productsStripeDataMap = {
    [id: string]: ProductVariant[];
};

function getProductsStripeMapping() {
    const env = currentEnvironment();

    switch (currentEnvironment()) {
        case 'prod':
            return productsStripeDataMappingProd;
        case 'staging':
            return productsStripeDataMappingStaging;
        case 'dev':
            return productsStripeDataMappingDev;
        default:
            throw new Error(`Invalid PUBLIC_APP_ENV "${env}"`);
    }
}

const productsStripeMappingData: productsStripeDataMap = getProductsStripeMapping();

const products: Product[] = productsData.map((productData) => {
    const productId = productData.id;

    const variants = productsStripeMappingData[productId] as ProductVariant[];

    return {
        id: productData.id,
        name: productData.name,
        images: productData.images,
        sizes: variants.map((variant) => variant.size),
        price: productData.price,
        variants: variants,
        sizeChart: productData.sizeChart,
    };
});

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
