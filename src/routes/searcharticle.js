const express = require('express');
const router = express.Router();
const db = require('../db/pool');
const getUserId = require('../util/tokenValidator');

// GET请求：获取所有群组
router.get('/', async (req, res) => {
    try {
        const [results] = await db.execute('SELECT * FROM searcharticlehistory');
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

        // 尝试插入记录
        try {
            const insertGroupSql = 'INSERT INTO searcharticlehistory (userid, content) VALUES (?, ?)';
            const insertGroupParams = [userId, content];
            await db.execute(insertGroupSql, insertGroupParams);
            res.status(200).json({ success: true });
        } catch (insertError) {
            if (insertError.code === 'ER_DUP_ENTRY') {
                // 如果是重复条目的错误，更新已存在记录的创建时间
                const updateSql = 'UPDATE searcharticlehistory SET created_at = CURRENT_TIMESTAMP WHERE userid = ? AND content = ?';
                await db.execute(updateSql, [userId, content]);
                res.status(200).json({ success: true });
            } else {
                // 处理其他类型的错误
                console.error('Failed to insert or update record', insertError);
                res.status(500).json({ success: false });
            }
        }

    } catch (error) {
        console.error('Failed to handle request', error);
        res.status(500).json({ success: false });
    }
});

module.exports = router;
