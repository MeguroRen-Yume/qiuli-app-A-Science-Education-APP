const express = require('express');
const router = express.Router();
const db = require('../db/pool');
const getUserId = require('../util/tokenValidator');

// 获取所有点赞记录
router.get('/', async (req, res) => {
    try {
        const [results] = await db.execute('SELECT * FROM postlike');
        res.send(results);
    } catch (error) {
        console.error('Failed to query database', error);
        res.status(500).send('无法获取数据');
    }
});

// 点赞帖子
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

        // 1. 获取当前帖子的点赞数
        const [postResults] = await db.query('SELECT likes FROM posts WHERE id = ?', [postid]);
        
        if (postResults.length === 0) {
            return res.status(404).json({ success: false, message: '帖子不存在。' });
        }

        const currentLikes = postResults[0].likes;

        // 2. 计算新的点赞数
        const newLikes = currentLikes + 1;

        // 3. 更新数据库中的点赞数
        await db.query('UPDATE posts SET likes = ? WHERE id = ?', [newLikes, postid]);

        // 4. 更新点赞记录
        await db.query('INSERT INTO postlike (userid, postid, liked) VALUES (?, ?, true) ON DUPLICATE KEY UPDATE liked = true', [userId, postid]);

        res.status(201).json({ success: true });

    } catch (error) {
        console.error('Failed to process like', error);
        res.status(500).json({ success: false, message: '处理失败。' });
    }
});

router.post('/unlike', async (req, res) => {
    const { token, postid } = req.body;

    if (!token || !postid) {
        return res.status(400).json({ success: false, message: '缺少必要的参数。' });
    }

    try {
        const userId = await getUserId(token);

        if (!userId) {
            return res.status(401).json({ success: false, message: '令牌无效或过期。' });
        }

        // 1. 获取当前帖子的点赞数
        const [postResults] = await db.query('SELECT likes FROM posts WHERE id = ?', [postid]);
        
        if (postResults.length === 0) {
            return res.status(404).json({ success: false, message: '帖子不存在。' });
        }

        const currentLikes = postResults[0].likes;

        // 2. 计算新的点赞数
        const newLikes = Math.max(currentLikes - 1, 0);

        // 3. 更新数据库中的点赞数
        await db.query('UPDATE posts SET likes = ? WHERE id = ?', [newLikes, postid]);

        // 4. 删除点赞记录
        await db.query('DELETE FROM postlike WHERE userid = ? AND postid = ?', [userId, postid]);

        res.status(200).json({ success: true });

    } catch (error) {
        console.error('Failed to process unlike', error);
        res.status(500).json({ success: false, message: '处理失败。' });
    }
});

module.exports = router;
