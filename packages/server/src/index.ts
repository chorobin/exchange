import * as express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { exchange } from './application/exchange';
import { currencies } from './application/currencies';
import { fetchCurrencies } from './infrastructure/fetchCurrencies';
import { fetchExchangeRates } from './infrastructure/fetchExchangeRates';
import { saveExanchangeTransaction } from './infrastructure/saveExchangeTransaction';

const schema = buildSchema(`
    type Query {
        currencies: [String]
    }
    input MoneyInput {
        amount: Float!
        currency: String!
    }
    type MoneyOutput {
        amount: Float
        currency: String
    }
    type Mutation {
        exchange(money: MoneyInput, targetCurrency: String): MoneyOutput
    }
`);

const root =  {
  exchange: (params) => exchange(params, fetchExchangeRates, saveExanchangeTransaction),
  currencies: () => currencies(fetchCurrencies)
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);