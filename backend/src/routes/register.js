const express = require('express');
const router = express.Router();
const db = require('../db/mysql');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.send('This is the registration page');
});

router.post('/', (req, res) => {
    const { username, password, phone_number } = req.body;

    // 检查是否所有必填字段都已提供
    if (!username || !password || !phone_number) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // 使用 bcrypt 对密码进行哈希加密
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password', err);
            return res.status(500).json({ error: 'Error hashing password' });
        }

        // 将加密后的密码和其他信息插入数据库
        db.query('INSERT INTO users (username, password, phone_number) VALUES (?, ?, ?)', [username, hashedPassword, phone_number], (error, results) => {
            if (error) {
                console.error('Error registering user', error);
                return res.status(500).json({ error: 'Error registering user' });
            }

            return res.status(200).json({ message: 'User registered successfully' });
        });
    });
});

module.exports = router;
