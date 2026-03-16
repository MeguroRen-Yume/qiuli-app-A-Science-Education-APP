const express = require('express');
const router = express.Router();
const db = require('../db/pool');
const getUserId = require('../util/tokenValidator');

router.get('/', async (req, res) => {
    try {
        const [results] = await db.execute('SELECT * FROM click');
        res.send(results);
    } catch (error) {
        console.error('Failed to query database', error);
        res.status(500).send('无法获取数据');
    }
});

router.post('/', async (req, res) => {
    const { token, postid } = req.body;

    if (!token || !postid) {
        return res.status(400).json({ success: false, message: '缺少必要的参数。' });
    }

    try {
        const userId = await getUserId(token);

        if (!userId) {
            return res.status(401).json({ success: false, message: '令牌无效或过期。' });
        }

        const [postResults] = await db.query('SELECT click FROM posts WHERE id = ?', [postid]);
        
        if (postResults.length === 0) {
            return res.status(404).json({ success: false, message: '帖子不存在。' });
        }

        const currentLikes = postResults[0].click;

        // 2. 计算新的点击数
        const newLikes = currentLikes + 1;

        // 3. 更新数据库中的点击数
        await db.query('UPDATE posts SET click = ? WHERE id = ?', [newLikes, postid]);

        // 4. 查找是否存在相同的记录
        const [clickResults] = await db.query('SELECT * FROM click WHERE userid = ? AND postid = ?', [userId, postid]);

        if (clickResults.length > 0) {
            // 更新存在的记录
            await db.query('UPDATE click SET created_at = CURRENT_TIMESTAMP WHERE userid = ? AND postid = ?', [userId, postid]);
        } else {
            // 插入新的记录
            await db.query('INSERT INTO click (userid, postid) VALUES (?, ?)', [userId, postid]);
        }

        res.status(201).json({ success: true });

    } catch (error) {
        console.error('Failed to process like', error);
        res.status(500).json({ success: false, message: '处理失败。' });
    }
});

module.exports = router;