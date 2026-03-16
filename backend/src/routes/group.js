const express = require('express');
const router = express.Router();
const db = require('../db/pool');
const getUserId = require('../util/tokenValidator');

// GET请求：获取所有群组
router.get('/', async (req, res) => {
    try {
        const [results] = await db.execute('SELECT * FROM grouplist');
        res.send(results);
    } catch (error) {
        console.error('Failed to query database', error);
        res.status(500).send('无法获取数据');
    }
});

// POST请求：创建群组
router.post('/', async (req, res) => {
    const { token, group_name } = req.body;

    if (!token || !group_name) {
        return res.status(400).json({ success: false, message: '缺少必要的参数。' });
    }

    try {
        const userId = await getUserId(token);

        if (!userId) {
            return res.status(401).json({ success: false, message: '令牌无效或过期。' });
        }

        // 检查是否存在相同的群组名
        const checkGroupSql = 'SELECT COUNT(*) AS count FROM grouplist WHERE group_name = ?';
        const [checkResults] = await db.execute(checkGroupSql, [group_name]);

        if (checkResults[0].count > 0) {
            return res.status(400).json({ success: false, message: '有重复群组名' });
        }

        // 插入群组到数据库
        const insertGroupSql = 'INSERT INTO grouplist (userid, group_name) VALUES (?, ?)';
        const insertGroupParams = [userId, group_name];
        
        await db.execute(insertGroupSql, insertGroupParams);

        res.status(201).json({ success: true, message: '群组创建成功' });

    } catch (error) {
        console.error('Failed to insert group into database', error);
        res.status(500).json({ success: false, message: '无法创建群组' });
    }
});

module.exports = router;
