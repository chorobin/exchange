import { useQuery } from 'react-query';
import { request } from 'graphql-request';
import { endpoint } from '../environment';
import getExchangeQuery from './getExchangeQuery.graphql';

export const useFetchExchange = () => useQuery('exchange', () => request(endpoint, getExchangeQuery));
