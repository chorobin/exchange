import currency from 'currency.js';
import { ExchangeTransaction } from '../domain/exchangeTransaction';

interface Stats {
    readonly popularCurrency: string;
    readonly totalExchangedInUSD: number;
    readonly exchangedCount: number;
}

const getPopularDestinationCurrency = (exchangedTransactions: ExchangeTransaction[]) => {
    const countedCurrencies = exchangedTransactions.reduce((countedCurrencies, exchangeTransaction) => {
        const count = countedCurrencies[exchangeTransaction.targetMoney.currency];
        countedCurrencies[exchangeTransaction.targetMoney.currency] = count ? count + 1 : 1;
        return countedCurrencies;
    }, {} as { [key: string]: number });
    const maxCurrency = Object.entries(countedCurrencies).reduce(
        (maxCurrency, currency) => (maxCurrency[1] > currency[1] ? maxCurrency : currency),
        ['N/A', 0],
    );
    return maxCurrency[0];
};

const getTotalExchangedInUSD = (exchangedTransactions: ExchangeTransaction[]): number =>
    exchangedTransactions.reduce(
        (total, exchangeTransaction) => total.add(exchangeTransaction.usdMoney.amount),
        currency(0),
    ).value;

export const stats = async (getExchangeTransactions: () => Promise<ExchangeTransaction[]>): Promise<Stats> => {
    const exchangeTransactions = await getExchangeTransactions();
    const popularDestinationCurrency = getPopularDestinationCurrency(exchangeTransactions);
    const exchangedCount = exchangeTransactions.length;
    const totalExchangedInUSD = getTotalExchangedInUSD(exchangeTransactions);

    return {
        popularCurrency: popularDestinationCurrency,
        exchangedCount,
        totalExchangedInUSD,
    };
};
