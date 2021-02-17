import * as React from 'react';
import { Box, BoxProps, Heading } from '@chakra-ui/react';

export const MetricTile: React.FunctionComponent<BoxProps & { title: string; icon: React.ReactNode }> = ({
    title,
    icon,
    children,
    ...props
}) => (
    <Box display="flex" flexFlow="column nowrap" {...props} justifyContent="center" alignItems="center">
        <Heading display="flex" alignItems="center">
            <Box marginRight="5px">{icon}</Box>
            {title}
        </Heading>
        <Heading>{children}</Heading>
    </Box>
);
