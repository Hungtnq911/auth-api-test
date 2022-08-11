const router = require('express').Router();
const User = require('../model/User');
const verify = require('./verifyToken');

//use when user have access
router.get('/',verify ,(req,res) => {
    res.send(req.user);
    
});

module.exports = router;