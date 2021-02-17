import * as React from 'react';
import { Center, Spinner } from '@chakra-ui/react';

export const Loading: React.FunctionComponent = () => (
    <Center left={0} right={0} bottom={0} top={0} position="absolute">
        <Spinner size="xl" />
    </Center>
);
