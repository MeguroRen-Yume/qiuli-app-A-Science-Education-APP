const express = require('express');
const router = express.Router();
const db = require('../db/pool');
const getUserId = require('../util/tokenValidator');

// GET请求：获取所有群组
router.get('/', async (req, res) => {
    try {
        const [results] = await db.execute('SELECT * FROM searchGroupHistory');
        res.send(results);
    } catch (error) {
        console.error('Failed to query database', error);
        res.status(500).send('无法获取数据');
    }
});

router.post('/', async (req, res) => {
    const { token, content } = req.body;

    if (!token || !content) {
        return res.status(400).json({ success: false, message: '缺少必要的参数。' });
    }

    try {
        const userId = await getUserId(token);

        if (!userId) {
            return res.status(401).json({ success: false, message: '令牌无效或过期。' });
        }

        // 查找是否存在相同的userid和content
        const [existingRecord] = await db.execute(
            'SELECT id FROM searchGroupHistory WHERE userid = ? AND content = ?',
            [userId, content]
        );

        if (existingRecord.length > 0) {
            // 更新已存在记录的创建时间
            const updateSql = 'UPDATE searchGroupHistory SET created_at = CURRENT_TIMESTAMP WHERE id = ?';
            await db.execute(updateSql, [existingRecord[0].id]);
        } else {
            // 插入新记录
            const insertGroupSql = 'INSERT INTO searchGroupHistory (userid, content) VALUES (?, ?)';
            const insertGroupParams = [userId, content];
            await db.execute(insertGroupSql, insertGroupParams);
        }

        res.status(200).json({ success: true });

    } catch (error) {
        console.error('Failed to handle request', error);
        res.status(500).json({ success: false });
    }
});

module.exports = router;
