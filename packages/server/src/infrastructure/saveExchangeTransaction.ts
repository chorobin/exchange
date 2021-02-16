import { ExchangeTransaction } from "../domain/exchangeTransaction";
import { promises as fs } from 'fs';

export const saveExanchangeTransaction = (exchangeTransaction: ExchangeTransaction): Promise<void> => {
    const addToFile = (rawData: Buffer) => {
        const exchangeTransactions: ExchangeTransaction[] = JSON.parse(rawData.toString());
        return fs.writeFile('./transactions.json', JSON.stringify([...exchangeTransactions, exchangeTransaction], null, 2));
    };
    const createFile = () =>  fs.writeFile('./transactions.json', JSON.stringify([exchangeTransaction], null, 2))
    return fs.readFile('./transactions.json')
        .then(addToFile)
        .catch(createFile);
} 