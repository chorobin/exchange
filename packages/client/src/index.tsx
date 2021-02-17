import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ChakraProvider, ThemeConfig } from '@chakra-ui/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { extendTheme } from '@chakra-ui/react';
import { Main } from './components/Main/Main';

const client = new QueryClient();

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};

const theme = extendTheme({ config });

ReactDOM.render(
    <ChakraProvider theme={theme}>
        <QueryClientProvider client={client}>
            <Main />
        </QueryClientProvider>
    </ChakraProvider>,
    document.getElementById('main'),
);
