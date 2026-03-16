const express = require('express');
const router = express.Router();
const db = require('../db/pool');
const getUserId = require('../util/tokenValidator');

router.post('/', async (req, res) => {
    const { token, username, text } = req.body;

    if (!token || !username || !text) {
        return res.status(400).json({ success: false, message: '缺少必要的参数。' });
    }

    try {
        const userId = await getUserId(token);

        if (!userId) {
            return res.status(401).json({ success: false, message: '令牌无效或过期。' });
        }

        await db.query('UPDATE users SET text = ?, username = ? WHERE id = ?', [text, username, userId]);

        res.status(200).json({ success: true, message: '个性签名更新成功。' });

    } catch (error) {
        console.error('Failed to update signature', error);
        res.status(500).json({ success: false, message: '更新失败。', error: error.message });
    }
});


module.exports = router;

