const express = require('express');
const router = express.Router();
const db = require('../db/mysql');
const register = require('./register'); 
const login = require('./login'); 
const article = require('./article'); 
const expand = require('./expand'); 
const answer = require('./answer'); 
const wrong= require('./wrong'); 
const post= require('./posts'); 
const comment= require('./comments'); 
const choose= require('./choose'); 
const ranking= require('./ranking');
const group= require('./group');
const member= require('./member');
const searchGroupHistory= require('./searchgroup');
const searcharticlehistory= require('./searcharticle');
const getid= require('./getid');
const point= require('./point');
const postlike= require('./postlike');
const click= require('./clickhistory');
const userdetail= require('./userdetail');
const guess= require('./guess');
const changekey= require('./changekey');
const checkkey= require('./checkkey');
// 根路径的处理，查询所有用户数据
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (error, results, fields) => {
        if (error) {
            console.error('Failed to query database', error);
            res.status(500).send('Failed to query database');
            return;
        }
        res.send(results);
    });
});

// 汇总所有用户相关的路由到 /users 路径下
router.use('/register', register);
router.use('/login', login);
router.use('/article', article);
router.use('/expand', expand);
router.use('/answer', answer);
router.use('/wrong', wrong);
router.use('/post', post);
router.use('/comment', comment);
router.use('/choose', choose);
router.use('/ranking', ranking);
router.use('/group', group);
router.use('/group/member', member);
router.use('/history/group', searchGroupHistory);
router.use('/history/article', searcharticlehistory);
router.use('/user/id', getid);
router.use('/point', point);
router.use('/postlike', postlike);
router.use('/post/click', click);
router.use('/user/detail', userdetail);
router.use('/guess', guess);
router.use('/changekey', changekey);
router.use('/checkkey', checkkey);

module.exports = router;
