const express = require('express');
const router = express.Router();
const db = require('../db/mysql');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.send('This is the login page');
});

router.post('/', (req, res) => {
    const { username, password } = req.body;

    // 查询用户是否存在于数据库中
    db.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
        if (error) {
            console.error('Error logging in user', error);
            return res.status(500).json({ error: 'Error logging in user' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // 用户存在，验证密码
        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // 生成 JWT token
        const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '999999h' });

        // 返回 JWT 给客户端
        return res.status(200).json({ message: 'User logged in successfully', token });
    });
});



module.exports = router;
