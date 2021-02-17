import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { exchange } from './application/exchange';
import { currencies } from './application/currencies';
import { fetchCurrencies } from './infrastructure/fetchCurrencies';
import { fetchExchangeRates } from './infrastructure/fetchExchangeRates';
import { saveExanchangeTransaction } from './infrastructure/saveExchangeTransaction';
import { stats } from './application/stats';
import { getExchangedTransactions } from './infrastructure/getExchangeTransations';

const schema = buildSchema(`
    type Stats {
        popularCurrency: String!
        totalExchangedInUSD: Float!
        exchangedCount: Int!
    }
    type Query {
        currencies: [String!]!
        stats: Stats!
    }
    input MoneyInput {
        amount: Float!
        currency: String!
    }
    type MoneyOutput {
        amount: Float!
        currency: String!
    }
    type Mutation {
        exchange(money: MoneyInput, targetCurrency: String): MoneyOutput
    }
`);

const root = {
    exchange: (params) => exchange(params, fetchExchangeRates, saveExanchangeTransaction),
    currencies: () => currencies(fetchCurrencies),
    stats: () => stats(getExchangedTransactions),
};

const app = express();

app.use(cors());
app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }),
);

app.listen(4000);
