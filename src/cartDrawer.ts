import { Drawer } from 'flowbite';
import type { DrawerOptions, DrawerInterface } from 'flowbite';

// options with default values
const options: DrawerOptions = {
    placement: 'right',
    backdrop: true,
};

export function initCartDrawer(cartDrawerElement: HTMLElement): DrawerInterface {
    return new Drawer(cartDrawerElement, options);
}
