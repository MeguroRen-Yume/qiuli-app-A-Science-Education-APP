const express = require('express');
const router = express.Router();
const db = require('../db/pool');
const getUserId = require('../util/tokenValidator');

// GET请求：获取所有群组
router.get('/', async (req, res) => {
    try {
        const [results] = await db.execute('SELECT * FROM members');
        res.send(results);
    } catch (error) {
        console.error('Failed to query database', error);
        res.status(500).send('无法获取数据');
    }
});

router.post('/', async (req, res) => {
    const { token, groupid } = req.body;

    if (!token || !groupid) {
        return res.status(400).json({ success: false, message: '缺少必要的参数。' });
    }

    try {
        const userId = await getUserId(token);

        if (!userId) {
            return res.status(401).json({ success: false, message: '令牌无效或过期。' });
        }

        // 插入群组到数据库
        const insertGroupSql = 'INSERT INTO members (userid, groupid) VALUES (?, ?)';
        const insertGroupParams = [userId, groupid];
        
        await db.execute(insertGroupSql, insertGroupParams);

        res.status(201).json({ success: true, message: '群组创建成功' });

    } catch (error) {
        console.error('Failed to insert group into database', error);
        res.status(500).json({ success: false, message: '无法创建群组' });
    }
});

module.exports = router;
