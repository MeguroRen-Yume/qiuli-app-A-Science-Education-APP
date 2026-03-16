const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');

// 验证并解析 JWT，返回用户ID
async function getUserId(token) {
    try {
        // 使用你的密钥解析 JWT
        const decoded = jwt.verify(token, jwtSecret);

        // 如果需要，你可以在这里添加其他验证逻辑，例如验证令牌的过期时间等
        if (isTokenExpired(decoded)) {
            console.log('Token has expired.');
            throw new Error('TokenExpiredError'); // 或者根据需要抛出适当的错误
        }

        // 返回解析后的用户ID
        return decoded.userId;
    } catch (err) {
        console.error('Failed to verify token:', err);
        throw new Error('TokenInvalidError'); // 验证失败时抛出自定义错误
    }
}

// 验证令牌是否过期的函数
function isTokenExpired(decodedToken) {
    if (!decodedToken.exp) return false; // 如果令牌没有过期时间，则视为未过期

    const nowSeconds = Math.floor(Date.now() / 1000);
    return decodedToken.exp < nowSeconds;
}

module.exports = getUserId;
