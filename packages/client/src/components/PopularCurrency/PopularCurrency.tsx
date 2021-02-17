import * as React from 'react';
import { BoxProps } from '@chakra-ui/react';
import { MetricTile } from '../MetricTile/MetricTile';
import { AiFillStar } from 'react-icons/ai';

export const PopularCurrency: React.FunctionComponent<{ popularCurrency: string } & BoxProps> = ({
    popularCurrency,
    ...props
}) => (
    <MetricTile title="Popular Currency" icon={<AiFillStar />} {...props}>
        {popularCurrency}
    </MetricTile>
);
