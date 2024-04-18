module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@components': './src/components',
          '@entry': './src/entry',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
