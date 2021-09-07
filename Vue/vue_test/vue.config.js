module.exports = {
    lintOnSave: false,
    // devServer: {
        // proxy: 'http://localhost:5000'
    // }
    devServer: {
        proxy: {
            '/school': {
                target: 'http://localhost:5000/',
                pathRewrite: {
                    '^/school': ''
                },
                ws: true,
                changeOrigin: true
              },
        }
    }
}