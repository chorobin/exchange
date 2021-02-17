import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ExchangeCount } from '../src/components/ExchangeCount/ExchangeCount';
import '@testing-library/jest-dom';

describe('ExchangeCount', () => {
    describe('when exchange count is 10', () => {
        test('renders 10', () => {
            render(<ExchangeCount exchangedCount={10} />);
            expect(screen.getByText('10')).toBeInTheDocument();
        });

        test('render Exchanged Count heading', () => {
            render(<ExchangeCount exchangedCount={10} />);
            expect(screen.getByText('Exchanged Count')).toBeInTheDocument();
        });
    });
});
