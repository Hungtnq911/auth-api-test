const router = require('express').Router();
const { description } = require('@hapi/joi/lib/base');
const User = require('../model/User');
const {requireAuth} = require('./verifyToken');
const objectID =require('mongoose').Types.ObjectId;
//use when user have access
router.get('/',requireAuth ,async (req,res) => {
    // get id
    const userID = req.user._id;
    // search for workspace and send back to client
    const workspaceID = await User.findOne(
        {_id :objectID(userID)},
        {_id : 0,workspaceID: 1}
    );

    res.send(workspaceID);
    
});
