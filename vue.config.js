// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

// { devServer: { host: '127.0.0.1', port: 8080, public: 'localhost:8080', }, };

module.exports = {
  devServer: {
    host: '127.0.0.1',
    port: 8081
  }
}

//const webpack = require('webpack');
// configureWebpack: {
//   plugins: [
//     new webpack.ProvidePlugin({
//       $: 'jquery',
//       jQuery: 'jquery',
//       'window.jQuery': 'jquery'
//     }),
//   ]
// }

// module.exports = {
//   devServer: {
//     proxy: {
//       '/api': {
//         target: 'https://152e-178-159-51-99.ngrok-free.app/', // Замените на адрес вашего Django-сервера
//         changeOrigin: true,
//       },
//     },
//   },
// };
