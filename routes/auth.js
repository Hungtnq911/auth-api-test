const router = require('express').Router();
const User = require ('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation,loginValidation} = require('../validation');



router.post ('/register', async (req,res)=>{

    //validate data
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check if user is already resgist
    const emailCheckExist = await User.findOne({email: req.body.email});
    if(emailCheckExist)return res.status(400).send('email already exists');

    //hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //passing data to db
    const user = new User({
        user: req.body.user,
        email: req.body.email,
        workspaceID: req.body.workspaceID,
        password: hashPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user :user._id});

    }catch(err){
        res.status(400).send(err);
    }
    
});

//login
router.post ('/login',async (req,res)=>{
    //validate data
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check if user is already resgist
    const user = await User.findOne({email: req.body.email});
    if(!user)return res.status(400).send('This email have not registered');

    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Password is wrong');

    //Create and assign a token if login success
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);
    


});


module.exports = router;