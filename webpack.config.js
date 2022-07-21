const path = require('path')
module.exports = {
    entry: path.join(__dirname,'./src/index.js'),
    output: {
        path: path.join(__dirname,'./dist'),
        filename: 'index.bundle.js'
    },
    devServer:{
        static: {
            directory: path.join(__dirname, './'),
        },
        compress:true,
        port:5555,
    },
    mode: 'development'
}