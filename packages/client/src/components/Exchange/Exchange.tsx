import { Grid, Heading, Text, Button, Input, GridProps, Box } from '@chakra-ui/react';
import * as React from 'react';
import { Currencies } from '../Currencies/Currencies';
import { RiExchangeDollarFill } from 'react-icons/ri';

export const Exchange: React.FunctionComponent<
    {
        currencies: string[];
        amount: string;
        onAmountChanged: (amount: string) => void;
        currency: string;
        onCurrencyChanged: (currency: string) => void;
        destinationAmount: number;
        destinationCurrency: string;
        onDestinationCurrencyChanged: (destinationCurrency: string) => void;
        onExchange: () => void;
        isExchanging: boolean;
    } & GridProps
> = ({
    currencies,
    amount,
    onAmountChanged,
    currency,
    onCurrencyChanged,
    destinationAmount,
    destinationCurrency,
    onDestinationCurrencyChanged,
    onExchange,
    isExchanging,
    ...props
}) => (
    <Grid
        templateAreas={{
            base: `
                        "heading heading"
                        "text text"
                        "baseMoney baseCurrency"
                        "destinationMoney destinationCurrency"
                        "exchangeButton exchangeButton"
                    `,
        }}
        gridGap={5}
        {...props}
    >
        <Heading gridArea="heading" display="flex" alignItems="center">
            <Box marginRight="5px">
                <RiExchangeDollarFill />
            </Box>
            Exchange your money
        </Heading>
        <Text>You send.</Text>
        <Input
            gridArea="baseMoney"
            isInvalid={isNaN(+amount)}
            onChange={(e) => onAmountChanged(e.target.value)}
            value={amount}
            isDisabled={isExchanging}
        ></Input>
        <Currencies
            gridArea="baseCurrency"
            currencies={currencies}
            onChange={(e) => onCurrencyChanged(e.target.value)}
            value={currency}
            isDisabled={isExchanging}
        />
        <Input gridArea="destinationMoney" isDisabled defaultValue={destinationAmount} />
        <Currencies
            gridArea="destinationCurrency"
            currencies={currencies}
            onChange={(e) => onDestinationCurrencyChanged(e.target.value)}
            value={destinationCurrency}
            isDisabled={isExchanging}
        />
        <Button
            colorScheme="green"
            gridArea="exchangeButton"
            isDisabled={isNaN(+amount)}
            isLoading={isExchanging}
            onClick={onExchange}
        >
            Exchange
        </Button>
    </Grid>
);
