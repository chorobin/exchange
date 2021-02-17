import merge from 'webpack-merge';
import common from './webpack.common';

const config = merge(common, {
    mode: 'development',
    devServer: {
        port: 4040,
    },
});

export default config;
