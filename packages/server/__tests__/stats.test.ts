import { stats } from '../src/application/stats';
import { ExchangeRate } from '../src/domain/exchangeRate';
import { ExchangeTransaction } from '../src/domain/exchangeTransaction';

describe('stats', () => {
    describe('when there are no exchange transactions', () => {
        test('popular currency is N/A', async () => {
            const statsResult = await stats(() => Promise.resolve([]));
            expect(statsResult.popularCurrency).toBe('N/A');
        });

        test('total exchange count is 0', async () => {
            const statsResult = await stats(() => Promise.resolve([]));
            expect(statsResult.exchangedCount).toBe(0);
        });

        test('total exchanged in USD is 0', async () => {
            const statsResult = await stats(() => Promise.resolve([]));
            expect(statsResult.totalExchangedInUSD).toBe(0);
        });
    });

    describe('when there are exchange transactions', () => {
        describe('with two USD and one CZK', () => {
            const czkExchangeRate: ExchangeRate = {
                base: 'CZK',
                rates: {
                    USD: 0.046,
                },
            };
            const usdExchangeRate: ExchangeRate = {
                base: 'USD',
                rates: {
                    USD: 0.046,
                },
            };
            const exchangeTransactions: ExchangeTransaction[] = [
                {
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
                    rate: czkExchangeRate,
                    date: new Date('2021-02-17'),
                },
                {
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
                    rate: czkExchangeRate,
                    date: new Date('2021-02-17'),
                },
                {
                    baseMoney: {
                        amount: 10,
                        currency: 'USD',
                    },
                    usdMoney: {
                        amount: 0.46,
                        currency: 'USD',
                    },
                    targetMoney: {
                        amount: 0.46,
                        currency: 'CZK',
                    },
                    rate: usdExchangeRate,
                    date: new Date('2021-02-17'),
                },
            ];

            test('USD is the popular currency', async () => {
                const statsResult = await stats(() => Promise.resolve(exchangeTransactions));
                expect(statsResult.popularCurrency).toBe('USD');
            });

            test('total exchanged count is 3', async () => {
                const statsResult = await stats(() => Promise.resolve(exchangeTransactions));
                expect(statsResult.exchangedCount).toBe(3);
            });

            test('total in usd is 1.38', async () => {
                const statsResult = await stats(() => Promise.resolve(exchangeTransactions));
                expect(statsResult.totalExchangedInUSD).toBe(1.38);
            });
        });
    });
});
