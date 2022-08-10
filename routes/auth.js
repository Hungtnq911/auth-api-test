const router = require('express').Router();
const User = require ('../model/User');
const bcrypt = require('bcryptjs');
const {registerValidation} = require('../validation');



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
        res.send(savedUser);

    }catch(err){
        res.status(400).send(err);
    }
    
});

//router.post ('/login')

module.exports = router;