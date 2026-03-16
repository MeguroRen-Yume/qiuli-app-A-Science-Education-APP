const express = require('express');
const router = express.Router();
const db = require('../db/pool');
const getUserId  = require('../util/tokenValidator');


router.get('/', (req, res) => {
    res.send('This is the choose page');
});

router.post('/', async (req, res) => {
    const { token, identity } = req.body;

    // 简单的输入验证
    if (!token || !identity) {
        return res.status(400).json({ success: false, message: '缺少必要的参数。' });
    }

    try {
        // 验证令牌并获取用户ID
        const userId = await getUserId(token);

        if (!userId) {
            return res.status(401).json({ success: false, message: '令牌无效或过期。' });
        }

        // 将评论存储到数据库
        const postIdentitySql = 'UPDATE users SET identity = ? WHERE id = ?';
        const postidentity = [identity, userId];
        
        // 使用 Promise 化的查询方法执行 SQL 插入操作
        await db.execute(postIdentitySql, postidentity);

        res.status(201).json({ success: true });

    } catch (error) {
        console.error('Failed to choose identity into database', error);
        res.status(500).json({ success: false, message: 'Failed to choose identity into database', error: error.message });
    }
});


module.exports = router;