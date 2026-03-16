const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');

// 定义一个中间件函数来验证 JWT
const jwtCheck = (req, res, next) => {
    // 从请求头中获取 Authorization 字段
    const authHeader = req.headers['authorization'];
    
    // 检查 Authorization 头部是否存在
    if (typeof authHeader !== 'undefined') {
        // 分割 Authorization 头部内容，获取 JWT
        const token = authHeader.split(' ')[1];
        
        // 使用jsonwebtoken包中的verify方法验证token
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                // 验证失败，返回错误响应
                console.error('JWT verification failed', err);
                res.status(403).json({ error: 'JWT verification failed' });
            } else {
                // 验证成功，将解码后的用户信息存储在请求中，以便后续路由可以访问
                req.user = decoded; // decoded 中包含了解码后的 JWT payload
                
                // 继续执行下一个中间件或路由处理函数
                next();
            }
        });
    } else {
        // 如果没有提供 Authorization 头部，返回错误响应
        res.status(401).json({ error: 'Authorization header is missing' });
    }
};

module.exports = { jwtCheck };
