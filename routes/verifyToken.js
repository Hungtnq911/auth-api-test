const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const requireAuth = (req,res,next) =>{

    const token = req.cookies.jwt;

    if(!token){
        //res.redirect('api/user/login');
        res.status(403).send('Access Denied');
    }
    try{
       const verify = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verify;
        next();
    }
    catch(err){
        res.status(400).send('Invalid token');;
    }
}
module.exports = {requireAuth};
