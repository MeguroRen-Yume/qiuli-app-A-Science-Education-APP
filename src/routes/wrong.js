const express = require('express');
const router = express.Router();
const db = require('../db/pool');
const getUserId  = require('../util/tokenValidator');

router.get('/', async (req, res) => {
    try {
        const [results, fields] = await db.execute('SELECT * FROM wrong');


        res.send(results);
    } catch (error) {
        console.error('Failed to query database', error);
        res.status(500).send('Failed to query database');
    }
});

router.get('/:token', async (req, res) => {
    try {
      const token = req.params.token;
      const userId = await getUserId(token); // 使用getUserId函数验证token中的用户ID
  
      // 查询数据库获取该用户的所有错题
      const [results, fields] = await db.execute('SELECT * FROM wrong WHERE userid = ?', [userId]);
  
      res.send(results);
    } catch (error) {
      console.error('Failed to query database', error);
      res.status(500).send('Failed to query database');
    }
  });



router.post('/', async(req, res) => {

    const { token,id, name, source, point, introduce, optionA, optionB, optionC, optionD, correctOption, analyse} = req.body;

    // 简单的输入验证
    if (!token || !id || !name ||!source || !point ||!introduce || !optionA || !optionB || !optionC ||!optionD ||!correctOption ||!analyse) {
        return res.status(400).json({ success: false, message: '缺少必要的参数。' });
    }

    try {
        // 验证令牌并获取用户ID
        const userId = await getUserId(token);

        if (!userId) {
            return res.status(401).json({ success: false, message: '令牌无效或过期。' });
        }

        // 将评论存储到数据库
        const insertWrongSql = 'INSERT INTO wrong (userid, id, name, source, point, introduce, optionA, optionB, optionC, optionD, correctOption, analyse) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?)';
        const insertWrongParams = [userId, id, name, source, point, introduce, optionA, optionB, optionC, optionD, correctOption, analyse];
        
        // 使用 Promise 化的查询方法执行 SQL 插入操作
        await db.execute(insertWrongSql, insertWrongParams);

        res.status(201).json({ success: true });

    } catch (error) {
        console.error('Failed to insert wrong into database', error);
        res.status(500).json({ success: false, message: 'Failed to insert wrong into database', error: error.message });
    }
});


module.exports = router;