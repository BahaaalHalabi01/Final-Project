const express = require('express')
const router = express.Router()
// const mongoose = require('mongoose')
const passport = require('passport')

//load validation 
const validateProfileInput = require('../../validation/profile')

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
        .populate('user',['name','avatar'])
        .then(profile =>{
            if(!profile){
                errors.noprofile = 'There is no profile for this user'
                return res.status(400).json(errors)
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

// @route       GET api/profile/all
// @description get all profiles
// @access      public 

router.get('/all',(req,res) =>{

    const errors ={}

    Profile.find()
    .populate('user',['name','avatar'])
    .then(profiles => {
        if(!profiles){
            errors.noprofile = 'There are no profiles'
            return res.status(404).json(errors)
        }
        res.json(profiles)
    }).catch(err => res.status(404).json({profile:'There are no profiles'}))

})


// @route       GET api/profile/handle/:handle
// @description get profile by handle
// @access      public route
router.get('/handle/:handle', (req,res) => {

    const errors = {}

     Profile.findOne({ handle: req.params.handle})
     .populate('user',['name','avatar'])
     .then(profile => {
         if(!profile){
             errors.noprofile = 'There is no profile for this user'
             res.status(404).json(errors)
         }

         res.json(profile)
     }).catch( err => res.status(404).json(err))
})

// @route       GET api/profile/user/:user_id
// @description get profile by user id
// @access      public route
router.get('/user/:user_id', (req,res) => {

    const errors = {}

     Profile.findOne({ user: req.params.user_id})
     .populate('user',['name','avatar'])
     .then(profile => {
         if(!profile){
             errors.noprofile = 'There is no profile for this user'
             res.status(404).json(errors)
         }

         res.json(profile)
     }).catch( err => res.status(404).json({profile: 'There is no profile for this user'}))
})




// @route       POST api/profile
// @description create user profile or edit
// @access      private route
router.post('/',passport.authenticate('jwt',{session:false}), (req,res) =>{
    
    const { errors, isValid } = validateProfileInput(req.body)

    //check validation
    if(!isValid){
        //return any errors
        return res.status(400).json(errors)
    }

    //get fields
    const profileFields= {}

    profileFields.user = req.user.id
    if(req.body.handle) profileFields.handle = req.body.handle
    if(req.body.company) profileFields.company = req.body.company
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