const ENV = process.env.NODE_ENV;

export default {
    __DEV__: ENV === 'development',
    __PROD__: ENV === 'production',
    __TEST__: ENV === 'test',
};
