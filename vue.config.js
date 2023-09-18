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
