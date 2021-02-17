import * as React from 'react';
import { BoxProps } from '@chakra-ui/react';
import { MetricTile } from '../MetricTile/MetricTile';
import { FiTrendingUp } from 'react-icons/fi';

export const ExchangeCount: React.FunctionComponent<{ exchangedCount: number } & BoxProps> = ({
    exchangedCount,
    ...props
}) => (
    <MetricTile title="Exchanged Count" icon={<FiTrendingUp />} {...props}>
        {exchangedCount}
    </MetricTile>
);
