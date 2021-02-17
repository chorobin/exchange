import request from 'graphql-request';
import { useMutation, useQueryClient } from 'react-query';
import { endpoint } from '../environment';
import exchangeMutation from './exchangeMutation.graphql';

export const useExchange = () => {
    const client = useQueryClient();
    return useMutation(
        (parameters: { money: { amount: number; currency: string }; targetCurrency: string }) =>
            request(endpoint, exchangeMutation, parameters),
        {
            onSuccess: () => client.invalidateQueries('exchange'),
        },
    );
};
