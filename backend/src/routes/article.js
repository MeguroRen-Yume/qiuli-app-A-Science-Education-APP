const express = require('express');
const router = express.Router();
const db = require('../db/mysql');

router.get('/', (req, res) => {
    db.query('SELECT * FROM articles', (error, results, fields) => {
        if (error) {
            console.error('Failed to query database', error);
            res.status(500).send('Failed to query database');
            return;
        }
        res.send(results);
    });
});

router.post('/:articleId/likeCount', (req, res) => {
    const articleId = req.params.articleId;
    db.query('UPDATE articles SET likes = likes + 1 WHERE id = ?', [articleId], (error, results, fields) => {
        if (error) {
            console.error('Failed to update likes', error);
            res.status(500).send('Failed to update likes');
            return;
        }
        res.send('Likes updated successfully');
    });
});

// 增加点击数
router.post('/:articleId/clickCount', (req, res) => {
    const articleId = req.params.articleId;
    db.query('UPDATE articles SET views = views + 1 WHERE id = ?', [articleId], (error, results, fields) => {
        if (error) {
            console.error('Failed to update views', error);
            res.status(500).send('Failed to update views');
            return;
        }
        res.send('Views updated successfully');
    });
});

module.exports = router;
