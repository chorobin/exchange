import currency from 'currency.js';
import { Money } from './money';

export interface ExchangeRate {
    readonly base: string;
    readonly rates: { [rate: string]: number };
}

export const exchangeMoney = (exchangeRate: ExchangeRate, money: Money, targetCurrency: string): Money => ({
    amount: currency(money.amount).multiply(exchangeRate.rates[targetCurrency]).value,
    currency: targetCurrency,
});
