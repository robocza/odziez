import productsData from './data/products.json';

interface ProductVariant {
    size: string;
    stripe: {
        productId: string;
        priceId: string;
    };
}

interface Product {
    id: string;
    name: string;
    image: string;
    variants: ProductVariant[];
}

export const products: Product[] = productsData as Product[];

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
