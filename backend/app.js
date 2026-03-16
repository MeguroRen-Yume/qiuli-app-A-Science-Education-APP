const express = require('express');
const app = express();
const port = 3001;
const routes = require('./src/routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');

// 使用 body-parser 中间件解析 application/json 格式的请求体
app.use(bodyParser.json());

// 使用 body-parser 中间件解析 application/x-www-form-urlencoded 格式的请求体
app.use(bodyParser.urlencoded({ extended: true }));

// 中间件
app.use(cors({
    origin: '*', // 允许所有来源的请求访问
    // 注意：在生产环境中，应谨慎使用通配符，最好指定具体的来源
}));
app.use(express.json()); // 解析 JSON 请求体
app.use('/', routes); // 将所有路由委托给 routes.js 中定义的路由处理
// 启动服务
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
