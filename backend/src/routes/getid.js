const express = require('express');
const router = express.Router();
const db = require('../db/pool');
const getUserId = require('../util/tokenValidator');

router.post('/', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ success: false, message: '缺少必要的参数。' });
    }

    try {
        const userId = await getUserId(token);

        if (!userId) {
            return res.status(401).json({ success: false, message: '令牌无效或过期。' });
        }

        // 你可以在这里执行其他操作，如将数据插入数据库
        // 示例： await db.query('INSERT INTO searchGroupHistory (userid, content) VALUES (?, ?)', [userId, 'some content']);

        res.status(201).json({ success: true, userId });  // 返回成功响应，并将 userId 包含在内

    } catch (error) {
        console.error('处理请求时发生错误:', error);
        res.status(500).json({ success: false, message: '服务器内部错误' });
    }
});

module.exports = router;
