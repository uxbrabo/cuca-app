module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '~': './src',
          '@': './', // <-- AQUI ESTÁ A REGRA PARA O ATALHO DA RAIZ
        },
      },
    ],
  ],
};