

module.exports = {
  devServer: {
    host: '10.160.2.249:8000/',
    port: 80
  }
}

// const fs = require('fs');
// const path = require('path');

// module.exports = {
//   publicPath: '/',
//   configureWebpack: {
//     plugins: [
//       {
//         apply(compiler) {
//           compiler.hooks.done.tap('GenerateHtaccess', () => {
//             const distPath = path.resolve(__dirname, 'dist');
//             const htaccessContent = `
//               <IfModule mod_rewrite.c>
//                 RewriteEngine On
//                 RewriteBase /
//                 RewriteRule ^index\\.html$ - [L]
//                 RewriteCond %{REQUEST_FILENAME} !-f
//                 RewriteCond %{REQUEST_FILENAME} !-d
//                 RewriteRule . /index.html [L]
//               </IfModule>
//             `;

//             fs.writeFileSync(path.join(distPath, '.htaccess'), htaccessContent);
//           });
//         },
//       },
//     ],
//   }
// }