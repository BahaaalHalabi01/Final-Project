const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

//load  models
const Profile = require('../../modules/Profile')
const User = require('../../modules/User')


// @route       GET api/profile/test
// @description Tests profile route
// @access      public route
router.get('/test',(req,res) => res.json({msg:'Profile Works'}))


// @route       GET api/profile
// @description get current user profile
// @access      private route
router.get('/',passport.authenticate('jwt',{session:false}), (req,res) =>{

    const errors = {}

    Profile.findOne({ user: req.user.id})
        .then(profile =>{
            if(!profile){
                errors.noprofile = 'There is no profile for this user'
                return res.status(400).json(errors)
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})




module.exports = router;