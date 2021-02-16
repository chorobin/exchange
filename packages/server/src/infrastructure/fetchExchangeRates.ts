import { ExchangeRate } from "../domain/exchangeRate";

import fetch from 'node-fetch';

export const fetchExchangeRates = (base: string): Promise<ExchangeRate> => 
    fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
        .then(response => response.json());