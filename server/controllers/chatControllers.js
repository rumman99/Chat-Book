const asyncHandler= require('express-async-handler');
const chatModel = require('../models/chatModel');
const userModel = require('../models/userModel');


// Creating one and one Chat //
const createChat= asyncHandler(async(req, res)=>{
    const {userId}= req.body;

    if(!userId){
        console.log("UserId not sent!!!")
        res.sendStatus(400);
    }

    let isChatExist= await chatModel.findOne({isGroup:false,
            users: {$all: [req.user._id, userId]}
    })
    .populate('users', '-password')
    .populate('latestMessage')

    isChatExist= await userModel.populate(isChatExist, {path: 'latestMessage.sender', select: 'name photo email'});

    if(isChatExist){
        res.send(isChatExist)
    }
    else{
        let chatData= {
            chatName: "sender",
            isGroup: false,
            users: [req.user._id, userId]
        };
        try{
            const createdChat= await chatModel.create(chatData);
            const findChat= await chatModel.findOne({_id: createdChat._id})
                .populate('users', '-password');
                
            res.status(200).send(findChat);
        }
        catch(err){
            res.status(400);
            throw new Error(err.message);
        }
    }
});

// all chat for User // 
const allChat= asyncHandler (async(req, res)=>{
    try{
        const userChats= await chatModel.find({users: req.user._id})
        .populate('users', '-password')
        .populate('groupAdmin', '-password')
        .populate('latestMessage').sort({updatedAt: -1})

        const result= await userModel.populate(userChats, {path: 'latestMessage.sender', select: 'name email photo'});

        res.send(result);
    }
    catch(err){
        res.status(400)
        throw new Error('No Chat')
    }
})

// Group Chat Creation //
const createGroupChat=asyncHandler(async(req, res)=>{
    if(!req.body.groupUsers || !req.body.groupName){
        return res.status(400).send({msg: "Please Fill All The Field"});
    }

    const groupUsers= JSON.parse(req.body.groupUsers);

    if(groupUsers<2){
        res.status(400).send("More than 2 Users are Required for Group")
    }
    // Pushing Login user also in the group users array //
    groupUsers.push(req.user);
    
    try{
        // Creating Group //
        const groupChat= await chatModel.create({chatName: req.body.groupName, users:groupUsers, isGroup:true, groupAdmin: req.user});

        const groupDetails= await chatModel.findOne({_id: groupChat._id})
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).send(groupDetails);
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

// Rename Group //
const renameGroup= asyncHandler(async(req, res)=>{
    const {groupId, groupName}= req.body;

    const updateGroupName= await chatModel.findByIdAndUpdate(groupId, {chatName: groupName}, {new: true})
        .populate("users", "-password")
        .populate("groupAdmin", "-password")

    if(!updateGroupName){
        res.status(400);
        throw new Error("Chat Not Found!!")
    }
    else{
        res.send(updateGroupName);
    }
});

// Add user To Group //
const addToGroup= asyncHandler(async(req, res)=>{
    const {groupId, userId}= req.body;

    const addedUser= await chatModel.findByIdAndUpdate(groupId, {$push: {users: userId}}, {new:true})
        .populate("users", "-password")
        .populate("groupAdmin", "-password")

    if(!addedUser){
        res.status(400);
        throw new Error("Chat Not Found!!")
    }
    else{
        res.json(addedUser);
    }

});

// Remove User from Group //
const removeFromGroup= asyncHandler(async(req, res)=>{
    const {groupId, userId}= req.body;

    const removedUser= await chatModel.findByIdAndUpdate(groupId, {$pull: {users: userId}}, {new:true})
        .populate("users", "-password")
        .populate("groupAdmin", "-password")

    if(!removedUser){
        res.status(400);
        throw new Error("Chat Not Found!!")
    }
    else{
        res.json(removedUser);
    }
});

module.exports= {createChat, allChat, createGroupChat, renameGroup, addToGroup, removeFromGroup};