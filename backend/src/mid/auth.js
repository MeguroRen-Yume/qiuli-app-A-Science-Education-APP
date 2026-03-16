const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  // 检查是否存在Token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // 验证Token
    const decoded = jwt.verify(token, 'secretToken'); // 这里的'secretToken'应该替换为你的实际密钥

    // 将用户信息添加到请求对象中
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;
