module.exports = {
  plugins: [
    [
      '@babel/plugin-transform-modules-umd',
      {
        exactGlobals: true,
      },
    ],
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
      presets: [['@babel/preset-env', { loose: true }]],
    },
  },
};
