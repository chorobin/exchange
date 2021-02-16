import { promises as fs } from 'fs';
import { ExchangeTransaction } from '../domain/exchangeTransaction';

export const getExchangedTransactions = (): Promise<ExchangeTransaction[]> => 
    fs.readFile('./transactions.json').then((rawData) => JSON.parse(rawData.toString())).catch(() => []);