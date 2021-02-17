import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ExchangedInUSD } from '../src/components/ExchangeInUSD/ExchangeInUSD';

describe('ExchangeInUSD', () => {
    describe('when exchange in usd is 10', () => {
        test('renders 10', () => {
            render(<ExchangedInUSD exchangedInUSD={10} />);
            expect(screen.getByText('10')).toBeInTheDocument();
        });

        test('render Total exchanged in USD', () => {
            render(<ExchangedInUSD exchangedInUSD={10} />);
            expect(screen.getByText('Total exchanged in USD')).toBeInTheDocument();
        });
    });
});
