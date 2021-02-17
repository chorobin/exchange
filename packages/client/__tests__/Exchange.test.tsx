import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Exchange } from '../src/components/Exchange/Exchange';
import '@testing-library/jest-dom';

describe('Exchange', () => {
    const onBaseAmountChanged = jest.fn();
    const onBaseCurrencyChanged = jest.fn();
    const onDestinationCurrencyChanged = jest.fn();
    const onExchange = jest.fn();

    beforeEach(() => {
        render(
            <Exchange
                currencies={['CZK', 'USD']}
                amount={'10'}
                onAmountChanged={onBaseAmountChanged}
                currency={'CZK'}
                onCurrencyChanged={onBaseCurrencyChanged}
                destinationAmount={20}
                destinationCurrency={'USD'}
                onDestinationCurrencyChanged={onDestinationCurrencyChanged}
                onExchange={onExchange}
                isExchanging={false}
            />,
        );
    });

    describe('when base currency is CZK', () => {
        test('renders base currency', () => {
            const currency = screen.getByRole('combobox', { name: /Base Currency/i });
            expect(currency).toHaveValue('CZK');
        });
    });

    describe('when destination currency is USD', () => {
        test('renders destination currency', () => {
            const destinationCurrency = screen.getByRole('combobox', { name: /Destination Currency/i });
            expect(destinationCurrency).toHaveValue('USD');
        });
    });

    describe('when base amount is 10', () => {
        test('renders base amount 10', () => {
            const baseAmount = screen.getByRole('textbox', { name: /Base Amount/i });
            expect(baseAmount).toHaveValue('10');
        });
    });

    describe('when destination amount is 20', () => {
        test('renders base amount 20', () => {
            const destinationAmount = screen.getByRole('textbox', { name: /Destination Amount/i });
            expect(destinationAmount).toHaveValue('20');
        });
    });

    describe('when base currency changed', () => {
        test('fires onBaseCurrencyChanged', () => {
            const baseCurrency = screen.getByRole('combobox', { name: /Base Currency/i });
            fireEvent.change(baseCurrency, { target: { value: 'USD' } });
            expect(onBaseCurrencyChanged).toBeCalledWith('USD');
        });
    });

    describe('when base amount changed', () => {
        test('fires onAmountChanged', () => {
            const baseAmount = screen.getByRole('textbox', { name: /Base Amount/i });
            fireEvent.change(baseAmount, { target: { value: '20' } });
            expect(onBaseAmountChanged).toBeCalledWith('20');
        });
    });

    describe('when destination currency changed', () => {
        test('fires onDestinationCurrencyChanged', () => {
            const destinationCurrency = screen.getByRole('combobox', { name: /Destination Currency/i });
            fireEvent.change(destinationCurrency, { target: { value: 'CZK' } });
            expect(onDestinationCurrencyChanged).toBeCalledWith('CZK');
        });
    });

    describe('when exchanged', () => {
        test('fires onExchanged', () => {
            const exchangeButton = screen.getByRole('button', { name: /Exchange/i });
            fireEvent.click(exchangeButton);
            expect(onExchange).toBeCalled();
        });
    });
});
