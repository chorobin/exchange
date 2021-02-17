import { exchange } from '../src/application/exchange';
import { ExchangeRate } from '../src/domain/exchangeRate';
import { ExchangeTransaction } from '../src/domain/exchangeTransaction';

describe('exchange', () => {
    describe('when base amount is 10 CZK', () => {
        describe('and destination currency is USD', () => {
            describe('and exchange rate is 0.046', () => {
                test('amount is 0.46', async () => {
                    const parameters = {
                        money: { amount: 10, currency: 'CZK' },
                        targetCurrency: 'USD',
                    };
                    const exchangeRate: ExchangeRate = {
                        base: 'CZK',
                        rates: {
                            USD: 0.046,
                        },
                    };

                    const exchangedMoney = await exchange(
                        parameters,
                        () => Promise.resolve(exchangeRate),
                        () => Promise.resolve(),
                    );

                    expect(exchangedMoney.amount).toBe(0.46);
                });

                test('exchanged currency is USD', async () => {
                    const parameters = {
                        money: { amount: 10, currency: 'CZK' },
                        targetCurrency: 'USD',
                    };
                    const exchangeRate: ExchangeRate = {
                        base: 'CZK',
                        rates: {
                            USD: 0.046,
                        },
                    };

                    const exchangedMoney = await exchange(
                        parameters,
                        () => Promise.resolve(exchangeRate),
                        () => Promise.resolve(),
                    );

                    expect(exchangedMoney.currency).toBe('USD');
                });

                test('transaction is saved', async () => {
                    const parameters = {
                        money: { amount: 10, currency: 'CZK' },
                        targetCurrency: 'USD',
                    };
                    const exchangeRate: ExchangeRate = {
                        base: 'CZK',
                        rates: {
                            USD: 0.046,
                        },
                    };

                    const saveTransaction = jest.fn();

                    await exchange(
                        parameters,
                        () => Promise.resolve(exchangeRate),
                        saveTransaction,
                        new Date('2021-02-17'),
                    );

                    const expectedTransaction: ExchangeTransaction = {
                        baseMoney: {
                            amount: 10,
                            currency: 'CZK',
                        },
                        usdMoney: {
                            amount: 0.46,
                            currency: 'USD',
                        },
                        targetMoney: {
                            amount: 0.46,
                            currency: 'USD',
                        },
                        rate: exchangeRate,
                        date: new Date('2021-02-17'),
                    };

                    expect(saveTransaction).toBeCalledWith(expectedTransaction);
                });
            });
        });
    });
});
