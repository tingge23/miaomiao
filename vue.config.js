module.exports= {
    publicPath : '/miaomiao',
    devServer :{  //开发环境配置
        proxy :{  //反向代理字段
            '/api2/' : {
                target: 'http://39.104.90.62:3000/',
                changeOrigin: true
            },
            /* '/api2' : {
                target : 'http://localhost:3000',
                changeOrigin : true
            }, */
            '/ajax/' : {
                target: 'https://m.maoyan.com',
                changeOrigin: true
            },
            '/dianying/' : {
                target: 'http://api.maoyan.com',
                changeOrigin: true
            },
            '/mmdb/' : {
                target: 'http://api.maoyan.com',
                changeOrigin: true
            },
            '/maoyanapi/' : {
                target: 'http://39.104.90.62',
                changeOrigin: true
            },
            '/ajax' :{
                target :'http://m.maoyan.com',
                changeOrigin : true   //是否改变反向代理配置
            }

        }
    }
}