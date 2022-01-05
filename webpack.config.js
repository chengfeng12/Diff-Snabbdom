const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    // publicPath: "xuni",
  },
  devServer: {//开发服务器配置
    port: 8000,//设置端口号
    static: {
      directory: path.join(__dirname, 'public'), // 服务器访问基本目录
    },
    client: {
      progress: true, // 进度条
    },
    // progress: true,  // 进度条 之前的配置
    open: true, // 打开页面
    // contentBase: './dist', // 服务器访问基本目录 之前的配置
  }
}
