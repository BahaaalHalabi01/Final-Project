const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
//post model
const Post = require('../../models/Post')
//validation
const validatePostInput = require('../../validation/post')
const Profile = require('../../models/Profile')
const { response } = require('express')


// @route       GET api/posts/test
// @description Tests posts route
// @access      public route
router.get('/test',(req,res) => res.json({msg:'Posts Works'}))

// @route       GET api/posts
// @description get all posts
// @access      public
router.get('/',(req,res) => {
    Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostsfound:'No posts found'}))
})

// @route       GET api/posts/:id
// @description get post by id
// @access      public
router.get('/:id',(req,res) => {
    Post.findById(req.params.id)
    .then(posts => res.json(posts))
    .catch(() => res.status(404).json({nopostfound:'No post found with that id'}))
})



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

// @route       DELTE api/posts/:id
// @description delete post by id
// @access      private
router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile => {
        Post.findById(req.params.id).then(post =>{
            if(post)
            {
                //check if the user owns the post
                
                if(req.user.id !== post.user.toString()){
                return res.status(401).json({notauthorized:'User not authorized to delete this post'})
                }

                //delete
                post.remove().then(() =>res.json({success: true}))
            }
        })
    }).catch(err => res.status(404).json({postnotfound: 'No post found'}))

})


module.exports = router;