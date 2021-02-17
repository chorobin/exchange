import fetch from 'node-fetch';

export const fetchCurrencies = (): Promise<string[]> =>
    fetch('https://openexchangerates.org/api/currencies.json')
        .then((response) => response.json())
        .then((response) => Object.keys(response));
