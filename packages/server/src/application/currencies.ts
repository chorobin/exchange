import { fetchCurrencies } from "../infrastructure/fetchCurrencies";

export const currencies = (fetchCurrencies: () => Promise<string[]>) => fetchCurrencies();