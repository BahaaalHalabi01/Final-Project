const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const passport = require("passport")
//post model
const Post = require("../../models/Post")
//validation
const validatePostInput = require("../../validation/post")
const Profile = require("../../models/Profile")

// @route       GET api/posts/test
// @description Tests posts route
// @access      public route
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }))

// @route       GET api/posts
// @description get all posts
// @access      public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => {
      //added this line because when the posts array is empty it is still outputing an empty array not saying it isnt found
      if (posts.length === 0) res.status(404).json({ nopostsfound: "No posts found" })
      else res.json(posts)
    })
    .catch((err) => res.status(404).json({ nopostsfound: "No posts found" }))
})

// @route       GET api/posts/:id
// @description get post by id
// @access      public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((posts) => res.json(posts))
    .catch(() => res.status(404).json({ nopostfound: "No post found with that id" }))
})

// @route       Post api/posts
// @description Create a post
// @access      private

router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)

  //check validation
  if (!isValid) {
    //send erros object and 400
    return res.status(400).json(errors)
  }

  const newPost = Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id,
  })

  newPost
    .save()
    .then((post) => res.json(post))
    .catch((err) => res.status(404).json(err))
})

// @route       DELTE api/posts/:id
// @description delete post by id
// @access      private
router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      Post.findById(req.params.id).then((post) => {
        if (post) {
          //check if the user owns the post

          if (req.user.id !== post.user.toString()) {
            return res.status(401).json({ notauthorized: "User not authorized to delete this post" })
          }

          //delete
          post.remove().then(() => res.json({ success: true }))
        }
      })
    })
    .catch((err) => res.status(404).json({ postnotfound: "No post found" }))
})

// @route       POST api/posts/like/:id ( post id)
// @description like post
// @access      private
router.post("/like/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      Post.findById(req.params.id).then((post) => {
        if (post) {
          if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadylikes: "User already liked this post" })
          }

          //add user id to likes array
          post.likes.unshift({ user: req.user.id })

          post.save().then((post) => res.json(post))
        }
      })
    })
    .catch((err) => res.status(404).json({ postnotfound: "No post found" }))
})

// @route       POST api/posts/unlike/:id ( post id)
// @description unlike post
// @access      private
router.post("/unlike/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      Post.findById(req.params.id).then((post) => {
        if (post) {
          if (post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ notliked: "User does not like this post" })
          }

          //get remove index to remove the like
          const removeIndex = post.likes.map((item) => item.user.toString()).indexOf(req.user.id)

          post.likes.splice(removeIndex, 1)

          //save in db
          post.save().then((post) => res.json(post))
        }
      })
    })
    .catch((err) => res.status(404).json({ postnotfound: "No post found" }))
})

// @route       POST api/posts/comment/:id ( post id)
// @description Add comment to a post
// @access      private
router.post("/comment/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)

  //validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  Post.findById(req.params.id)
    .then((post) => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
      }

      //add to the comments array
      post.comments.unshift(newComment)
      post.save().then((post) => res.json(post))
    })
    .catch((err) => res.status(404).json(err))
})

// @route       DELTE api/posts/comment/:id/:comment_id ( post id)
// @description Delete comment to a post by its id
// @access      private
router.delete("/comment/:id/:comment_id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      //check to see if the comment exists
      if (post.comments.filter((comment) => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({ commentnotexist: "Comment does not exist" })
      }

      //get the index to remove
      const removeIndex = post.comments.map((item) => item._id.toString()).indexOf(req.params.comment_id)

      //remove it from the array
      post.comments.splice(removeIndex, 1)
      post.save().then((post) => res.json(post))
    })
    .catch((err) => res.status(404).json(err))
})

module.exports = router
