const express = require('express');
const router = express.Router();
const db = require('../db/mysql');

router.get('/', (req, res) => {
    db.query('SELECT * FROM expand', (error, results, fields) => {
        if (error) {
            console.error('Failed to query database', error);
            res.status(500).send('Failed to query database');
            return;
        }
        res.send(results);
    });
});

module.exports = router;
