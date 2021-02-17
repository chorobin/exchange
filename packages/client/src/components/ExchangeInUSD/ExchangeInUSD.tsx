import * as React from 'react';
import { BoxProps } from '@chakra-ui/react';
import { MetricTile } from '../MetricTile/MetricTile';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

export const ExchangedInUSD: React.FunctionComponent<{ exchangedInUSD: number } & BoxProps> = ({
    exchangedInUSD,
    ...props
}) => (
    <MetricTile title="Total exchanged in USD" icon={<RiMoneyDollarCircleLine />} {...props}>
        {exchangedInUSD}
    </MetricTile>
);
