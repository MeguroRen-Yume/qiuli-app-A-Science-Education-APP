
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');
const express = require('express');
const router = express.Router();
const db = require('../db/pool');
const getUserId  = require('../util/tokenValidator');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.send('This is the checkkey page');
});

router.post('/', async(req, res) => {
    const { token, current_password, new_password } = req.body;

    const userId = await getUserId(token);
    bcrypt.hash(current_password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password', err);
            return res.status(500).json({ error: 'Error hashing password' });
        }

        // 查询用户是否存在于数据库中
    db.query('SELECT * FROM users WHERE id = ?', [userId], async (error, results) => {

        if (error) {
            console.error('Error logging in user', error);
            return res.status(500).json({success: false, error: 'Error logging in user' });
        }

        if (results.length === 0) {
            return res.status(404).json({success: false, error: 'User not found' });
        }

        // 用户存在，验证密码
        const user = results[0];
        const isPasswordValid = await bcrypt.compare(hashedPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({success: false, error: 'Invalid password' });
        }
        return res.status(200).json({success: true, message: 'success' });

    });
    });
    
});



module.exports = router;
