const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        port: 1000,
        proxy:{
            '/api': {
                target: 'http://localhost:8080/furn',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' // 重写路径
                }
            }
        },
        client: {
            overlay: false
        },
    }

})
