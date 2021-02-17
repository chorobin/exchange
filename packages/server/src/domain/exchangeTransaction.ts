import { ExchangeRate } from './exchangeRate';
import { Money } from './money';

export interface ExchangeTransaction {
    readonly baseMoney: Money;
    readonly usdMoney: Money;
    readonly rate: ExchangeRate;
    readonly targetMoney: Money;
    readonly date: Date;
}

export const newTransaction = (
    baseMoney: Money,
    usdMoney: Money,
    rate: ExchangeRate,
    targetMoney: Money,
    date: Date,
): ExchangeTransaction => ({
    baseMoney,
    usdMoney,
    rate,
    targetMoney,
    date,
});
