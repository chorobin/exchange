import { Center, Grid } from '@chakra-ui/react';
import * as React from 'react';
import { useExchange } from '../../hooks/useExchange';
import { useFetchExchange } from '../../hooks/useFetchExchange';
import { Exchange } from '../Exchange/Exchange';
import { ExchangeCount } from '../ExchangeCount/ExchangeCount';
import { ExchangedInUSD } from '../ExchangeInUSD/ExchangeInUSD';
import { Loading } from '../Loading/Loading';
import { PopularCurrency } from '../PopularCurrency/PopularCurrency';

export const Main: React.FunctionComponent = () => {
    const { data, isLoading, isError } = useFetchExchange();
    const [currency, setCurrency] = React.useState('CZK');
    const [destinationCurrency, setDestinationCurrency] = React.useState('USD');
    const [amount, setAmount] = React.useState<string>('1000');
    const mutation = useExchange();

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error!</div>;
    }

    return (
        <Center height="100%">
            <Grid
                gridTemplate={{
                    base: `"popularCurrency exchange exchangedCount" "exchangedInUSD exchangedInUSD exchangedInUSD"`,
                }}
                gridGap={20}
            >
                <PopularCurrency gridArea="popularCurrency" popularCurrency={data?.stats?.popularCurrency ?? 'N/A'} />
                <Exchange
                    currencies={data?.currencies ?? []}
                    amount={amount}
                    onAmountChanged={setAmount}
                    currency={currency}
                    onCurrencyChanged={setCurrency}
                    destinationAmount={mutation?.data?.exchange?.amount}
                    destinationCurrency={destinationCurrency}
                    onDestinationCurrencyChanged={setDestinationCurrency}
                    onExchange={() =>
                        mutation.mutate({
                            money: { amount: parseFloat(amount), currency },
                            targetCurrency: destinationCurrency,
                        })
                    }
                    isExchanging={mutation.isLoading}
                    gridArea="exchange"
                />
                <ExchangeCount gridArea="exchangedCount" exchangedCount={data?.stats?.exchangedCount} />
                <ExchangedInUSD gridArea="exchangedInUSD" exchangedInUSD={data?.stats?.totalExchangedInUSD} />
            </Grid>
        </Center>
    );
};
