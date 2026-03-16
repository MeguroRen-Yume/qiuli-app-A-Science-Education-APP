const express = require('express');
const router = express.Router();
const db = require('../db/pool');
const getUserId = require('../util/tokenValidator');

router.get('/', async (req, res) => {
    try {
        const [results] = await db.execute('SELECT * FROM users');
        res.send(results);
    } catch (error) {
        console.error('Failed to query database', error);
        res.status(500).send('无法获取数据');
    }
});

router.post('/', async (req, res) => {
    const { token, point } = req.body;

    if (!token || !point) {
        return res.status(400).json({ success: false, message: '缺少必要的参数。' });
    }

    try {
        const userId = await getUserId(token);

        if (!userId) {
            return res.status(401).json({ success: false, message: '令牌无效或过期。' });
        }

        // 1. 获取当前用户的point值
        const [userResults] = await db.execute('SELECT point FROM users WHERE id = ?', [userId]);
        
        if (userResults.length === 0) {
            return res.status(404).json({ success: false, message: '用户不存在。' });
        }

        const currentPoint = userResults[0].point;

        // 2. 计算新的point值
        const newPoint = currentPoint + point;

        // 3. 更新数据库中的point值
        const updatePointSql = 'UPDATE users SET point = ? WHERE id = ?';
        await db.execute(updatePointSql, [newPoint, userId]);

        res.status(201).json({ success: true });

    } catch (error) {
        console.error('Failed to update point in database', error);
        res.status(500).json({ success: false });
    }
});

module.exports = router;
