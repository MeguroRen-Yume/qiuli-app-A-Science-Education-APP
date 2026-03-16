const express = require('express');
const router = express.Router();
const db = require('../db/pool');
const getUserId  = require('../util/tokenValidator');

// GET请求：获取所有评论
router.get('/', async (req, res) => {
    try {
        // 使用 Promise 化的查询方法执行 SQL 查询
        const [results, fields] = await db.execute('SELECT * FROM comments');

        res.send(results);
    } catch (error) {
        console.error('Failed to query database', error);
        res.status(500).send('Failed to query database');
    }
});


// POST请求：添加新评论
router.post('/', async (req, res) => {
    const { token, postid, content } = req.body;

    // 简单的输入验证
    if (!token || !postid || !content) {
        return res.status(400).json({ success: false, message: '缺少必要的参数。' });
    }

    try {
        // 验证令牌并获取用户ID
        const userId = await getUserId(token);

        if (!userId) {
            return res.status(401).json({ success: false, message: '令牌无效或过期。' });
        }

        // 将评论存储到数据库
        const insertCommentSql = 'INSERT INTO comments (userid, postid, content) VALUES (?, ?, ?)';
        const insertCommentParams = [userId, postid, content];
        
        // 使用 Promise 化的查询方法执行 SQL 插入操作
        await db.execute(insertCommentSql, insertCommentParams);

        res.status(201).json({ success: true });

    } catch (error) {
        console.error('Failed to insert comment into database', error);
        res.status(500).json({ success: false, message: 'Failed to insert comment into database', error: error.message });
    }
});

module.exports = router;
