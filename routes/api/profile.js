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

// @route       POST api/profile
// @description create user profile or edit
// @access      private route
router.post('/',passport.authenticate('jwt',{session:false}), (req,res) =>{
    
    //get fields
    const profileFields= {}
    const errors ={}
    
    profileFields.user = req.user.id
    if(req.body.handle) profileFields.handle = req.body.handle
    if(req.body.company) profileFields.comapny = req.body.company
    if(req.body.website) profileFields.website = req.body.website
    if(req.body.location) profileFields.location = req.body.location
    if(req.body.bio) profileFields.bio = req.body.bio
    if(req.body.status) profileFields.status = req.body.status
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername
    //skills - split by commas into an array
    if(typeof req.body.skills !== 'undefined') profileFields.skills = req.body.skills.split(',')
    //social intialize cz it is an object
    profileFields.social = {}
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
    if(req.body.facebook) profileFields.social.facebook= req.body.facebook
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram

    Profile.findOne({user:req.user.id})
        .then(profile => {
            if(profile){
                //we are updating cz it already exists
                Profile.findOneAndUpdate(
                    {user:req.user.id},
                    { $set: profileFields},
                    {new:true}).then(profile => res.json(profile))
            }else {
                // we are creating cz it exits
                //check if handle exists

                Profile.findOne({ handle: profileFields.handle}).then(profile => {
                    if(profile){
                        errors.handle = 'That handle already exits'
                        res.status(400).json(errors)
                    }
                    //save new profile if handle doesnt exist
                    new Profile(profileFields).save().then(profile => res.json(profile))
                })
            }
        })
    


})


module.exports = router;