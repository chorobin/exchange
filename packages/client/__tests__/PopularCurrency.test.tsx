import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PopularCurrency } from '../src/components/PopularCurrency/PopularCurrency';

describe('PopularCurrency', () => {
    describe('when popular currency is CZK', () => {
        test('renders 10', () => {
            render(<PopularCurrency popularCurrency="CZK" />);
            expect(screen.getByText('CZK')).toBeInTheDocument();
        });

        test('render Popular Currency heading', () => {
            render(<PopularCurrency popularCurrency="CZK" />);
            expect(screen.getByText('Popular Currency')).toBeInTheDocument();
        });
    });
});
