const express = require('express');
const router = express.Router();
const db = require('../db/pool');
const getUserId  = require('../util/tokenValidator');
const bcrypt = require('bcryptjs');
router.get('/', (req, res) => {
    res.send('This is the changekey page');
});
router.post('/', async (req, res) => {
    const { token, current_password, new_password } = req.body;


        const userId = await getUserId(token);
        if (!userId) {
            return res.status(404).json({ success: false, message: '令牌无效或过期。' });
        }


        //   db.query('SELECT * FROM users WHERE id = ?', [userId], async (error, results) => {

        //     const user = results[0];
        //     const isPasswordValid = await bcrypt.compare(current_password, user.password);
    
        //     if (!isPasswordValid) {
        //         return res.status(402).json({ error: 'Invalid password' });
        //     }
        // });

      const hashedPassword = await bcrypt.hash(new_password, 10);

      db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId], (error, result) => {

        
        if (error) {
          console.error('Error updating password', error);
          return res.status(500).json({ success: false, error: 'Error updating password' });
        }
        return res.status(200).json({ success: true, message: 'Password updated successfully' });
      });



  });

module.exports = router;



