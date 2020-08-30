const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
//post model
const Post = require('../../models/Post')
//validation
const validatePostInput = require('../../validation/post')


// @route       GET api/posts/test
// @description Tests posts route
// @access      public route
router.get('/test',(req,res) => res.json({msg:'Posts Works'}))


// @route       Post api/posts
// @description Create a post
// @access      private

router.post('/',passport.authenticate('jwt',{session:false}),(req,res) =>{

    const {errors, isValid } = validatePostInput(req.body)

    //check validation
    if(!isValid){
        //send erros object and 400
        return res.status(400).json(errors)
    }

    const newPost = Post ({
        
        text:req.body.text,
        name:req.body.name,
        avatar:req.body.avatar,
        user:req.user.id
    })

    newPost.save().then(post => res.json(post)).catch(err => res.status(404).json(err))

})


module.exports = router;