// const express = require('express');
// const router = express.Router();
// const db = require('../db/pool');
// const getUserId  = require('../util/tokenValidator');


// router.get('/', async (req, res) => {
//     try {
//         // 查询 ranking 表
//         const [rankingResults] = await db.execute('SELECT userid, answerCount, rightRate FROM ranking');

//         // 遍历 ranking 结果，为每个 userid 获取 username
//         for (const rankingRow of rankingResults) {
//             const [userResult] = await db.execute(
//                 'SELECT username FROM users WHERE id = ?',
//                 [rankingRow.userid]
//             );

//             // 如果找到了匹配的用户，则更新 ranking 结果中的 username
//             if (userResult.length > 0) {
//                 rankingRow.username = userResult[0].username;
//             }
//         }

//         // 返回更新后的 ranking 结果
//         res.json(rankingResults);
//     } catch (error) {
//         console.error('Failed to query database', error);
//         res.status(500).send('Failed to query database');
//     }
// });

// router.post('/', async (req, res) => {
//     const { token, rightRate: newRightRate, answerCount: newAnswerCount, answerCount,rightRate } = req.body;

//     // 简单的输入验证
//     if (!token || !newRightRate || !newAnswerCount) {
//         return res.status(400).json({ success: false, message: '缺少必要的参数。' });
//     }

//     try {
//         // 验证令牌并获取用户ID
//         const userId = await getUserId(token);

//         if (!userId) {
//             return res.status(401).json({ success: false, message: '令牌无效或过期。' });
//         }

//         // 查询原有数据
//         const selectSql = 'SELECT rightRate, answerCount FROM ranking WHERE userid = ?';
//         const [rows] = await db.execute(selectSql, [userId]);

//         if (rows.length === 0) {
//             // return res.status(404).json({ success: false, message: '未找到对应用户的记录。' });
//             const insertrankSql = 'INSERT INTO ranking (userid, rightRate, answerCount) VALUES (?, ?, ?)';
//             const insertrankParams = [userId, rightRate, answerCount];
            
//             // 使用 Promise 化的查询方法执行 SQL 插入操作
//             await db.execute(insertrankSql, insertrankParams);
    
//             res.status(201).json({ success: true });
//         }

//         const { rightRate: oldRightRate, answerCount: oldAnswerCount } = rows[0];

//         // 计算新的 rightRate 和 answerCount
//         const updatedAnswerCount = oldAnswerCount + newAnswerCount;
//         const updatedRightRate = (oldRightRate * oldAnswerCount + newRightRate * newAnswerCount) / updatedAnswerCount;

//         // 更新数据库
//         const updateSql = 'UPDATE ranking SET rightRate = ?, answerCount = ? WHERE userid = ?';
//         await db.execute(updateSql, [updatedRightRate, updatedAnswerCount, userId]);

//         res.status(200).json({ success: true, message: '数据已成功更新。' });

//     } catch (error) {
//         console.error('Failed to update data in database', error);
//         res.status(500).json({ success: false, message: 'Failed to update data in database', error: error.message });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const db = require('../db/pool');
const getUserId  = require('../util/tokenValidator');

router.get('/', async (req, res) => {
    try {
        // 查询 ranking 表
        const [rankingResults] = await db.execute('SELECT userid, answerCount, rightRate FROM ranking');

        // 遍历 ranking 结果，为每个 userid 获取 username
        for (const rankingRow of rankingResults) {
            const [userResult] = await db.execute(
                'SELECT username FROM users WHERE id = ?',
                [rankingRow.userid]
            );

            // 如果找到了匹配的用户，则更新 ranking 结果中的 username
            if (userResult.length > 0) {
                rankingRow.username = userResult[0].username;
            }
        }

        // 返回更新后的 ranking 结果
        res.json(rankingResults);
    } catch (error) {
        console.error('Failed to query database', error);
        res.status(500).json({ success: false, message: 'Failed to query database', error: error.message });
    }
});

router.get('/:token', async (req, res) => {
    try {
      const token = req.params.token;
      const userId = await getUserId(token); // 使用getUserId函数验证token中的用户ID

      const [results, fields] = await db.execute('SELECT * FROM ranking WHERE userid = ?', [userId]);
  
      res.send(results);
    } catch (error) {
      console.error('Failed to query database', error);
      res.status(505).send('Failed to query database');
    }
  });

router.post('/', async (req, res) => {
    const { token, rightRate: newRightRate, answerCount: newAnswerCount } = req.body;

    // 简单的输入验证
    if (!token || !newRightRate || !newAnswerCount) {
        return res.status(400).json({ success: false, message: '缺少必要的参数。' });
    }

    try {
        // 验证令牌并获取用户ID
        const userId = await getUserId(token);

        if (!userId) {
            return res.status(401).json({ success: false, message: '令牌无效或过期。' });
        }

        // 查询原有数据
        const selectSql = 'SELECT rightRate, answerCount FROM ranking WHERE userid = ?';
        const [rows] = await db.execute(selectSql, [userId]);

        if (rows.length === 0) {
            // 插入新记录
            const insertrankSql = 'INSERT INTO ranking (userid, rightRate, answerCount) VALUES (?, ?, ?)';
            const insertrankParams = [userId, newRightRate, newAnswerCount];
            
            // 使用 Promise 化的查询方法执行 SQL 插入操作
            await db.execute(insertrankSql, insertrankParams);
    
            return res.status(201).json({ success: true, message: '数据已成功插入。' });
        }

        const { rightRate: oldRightRate, answerCount: oldAnswerCount } = rows[0];

        // 计算新的 rightRate 和 answerCount
        const updatedAnswerCount = oldAnswerCount + newAnswerCount;
        const updatedRightRate = (oldRightRate * oldAnswerCount + newRightRate * newAnswerCount) / updatedAnswerCount;

        // 更新数据库
        const updateSql = 'UPDATE ranking SET rightRate = ?, answerCount = ? WHERE userid = ?';
        await db.execute(updateSql, [updatedRightRate, updatedAnswerCount, userId]);

        res.status(200).json({ success: true, message: '数据已成功更新。' });

    } catch (error) {
        console.error('Failed to update data in database', error);
        res.status(500).json({ success: false, message: 'Failed to update data in database', error: error.message });
    }
});

module.exports = router;