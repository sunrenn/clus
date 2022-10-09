const path = require('path');
const htmlwp = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: path.join(__dirname,'./src/index.js'),
    output: {
        path: path.join(__dirname,'./dist'),
        filename: 'index.bundle.js'
    },
    plugins: [
        // isProduction ? new MiniCssExtractPlugin() : {},
        new htmlwp({
            template: './src/index.html',
            // 这个html不需要手动写script入口文件链接，会自动生成。
        })
    ],
    module:{
      rules:[  //rules是个数组，其中每一项都至少需要两个属性：test, use
        {
          test:/\.less$/, //打包文件的路径符合该规则，则使用这个loader
          use:[
            // 注意这里的执行顺序是从后往前。所以先用到的css-loader放在后面。
            // isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 
            'style-loader',
            'css-loader',
            'less-loader',
          ]
        },
      ]
    },
    devServer:{
        static: {
            directory: path.join(__dirname, './'),
        },
        port:5555,
        hot:true,
    },
    mode: 'development'
}