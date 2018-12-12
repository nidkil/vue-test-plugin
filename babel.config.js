module.exports = {
  presets: [
    '@vue/app'
  ],
  sourceType: 'unambiguous',
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: {
        '@': require('path').resolve(__dirname, './src'),
        'plugin': require('path').resolve(__dirname, './plugin'),
        'root': require('path').resolve(__dirname)
      }
    }]
  ]
}
