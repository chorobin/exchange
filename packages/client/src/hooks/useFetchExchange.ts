import { QueryObserverResult, useQuery } from 'react-query';
import { request } from 'graphql-request';
import { endpoint } from '../environment';
import getExchangeQuery from './getExchangeQuery.graphql';

interface Stats {
    readonly popularCurrency: string;
    readonly totalExchangedInUSD: number;
    readonly exchangedCount: number;
}

interface QueryResult {
    readonly stats: Stats;
    readonly currencies: string[];
}

export const useFetchExchange = (): QueryObserverResult<QueryResult> =>
    useQuery('exchange', () => request(endpoint, getExchangeQuery));
