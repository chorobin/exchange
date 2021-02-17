import request from 'graphql-request';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { endpoint } from '../environment';
import exchangeMutation from './exchangeMutation.graphql';

interface Money {
    readonly amount: number;
    readonly currency: string;
}

interface MutationParameters {
    readonly money: Money;
    readonly targetCurrency: string;
}

interface MutationResult {
    readonly exchange: Money;
}

export const useExchange = (): UseMutationResult<MutationResult, Error, MutationParameters> => {
    const client = useQueryClient();
    return useMutation(
        (parameters: { money: { amount: number; currency: string }; targetCurrency: string }) =>
            request(endpoint, exchangeMutation, parameters),
        {
            onSuccess: () => client.invalidateQueries('exchange'),
        },
    );
};
