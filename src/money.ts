import Dinero, { Currency } from 'dinero.js';

export type Money = {
    amount: number;
    currency: string;
};

export function formatMoney(money: Money, locale: string): string {
    const price = Dinero({ amount: money.amount, currency: money.currency as Currency });

    let format = price.hasSubUnits() ? '$0,0.00' : '$0,0';

    return price.setLocale(locale).toFormat(format);
}
