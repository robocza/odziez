import productsData from './data/products.dist.json';

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

const products: Product[] = productsData as Product[];

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
