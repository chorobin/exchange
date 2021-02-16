import { exchangeMoney, ExchangeRate } from "../domain/ExchangeRate";
import { ExchangeTransaction, newTransaction } from "../domain/exchangeTransaction";
import { Money } from "../domain/money";

interface ExchangeParameters {
    readonly money: Money;
    readonly targetCurrency: string;
}

export const exchange = async (
    parameters: ExchangeParameters,
    fetchExchangeRate: (base: string) => Promise<ExchangeRate>,
    saveExchangeTransaction: (transaction: ExchangeTransaction) => Promise<void>
) => {
    const exchangeRate = await fetchExchangeRate(parameters.money.currency);
    const usdMoney = exchangeMoney(exchangeRate, parameters.money, 'USD');
    const targetMoney = exchangeMoney(exchangeRate, parameters.money, parameters.targetCurrency);
    const transaction = newTransaction(parameters.money, usdMoney, exchangeRate, targetMoney, new Date());

    await saveExchangeTransaction(transaction);
    return targetMoney;
};