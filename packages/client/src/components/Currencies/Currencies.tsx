import { Select, SelectProps } from '@chakra-ui/react';
import * as React from 'react';

export const Currencies: React.FunctionComponent<{ currencies: string[] } & SelectProps> = ({
    currencies,
    ...props
}) => (
    <Select {...props}>
        {currencies.map((currency) => (
            <option key={currency} value={currency}>
                {currency}
            </option>
        ))}
    </Select>
);
