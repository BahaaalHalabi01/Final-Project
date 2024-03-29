const express = require('express')
const router = express.Router()
// const mongoose = require('mongoose')
const passport = require('passport')

//load validation 
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')


//load  models
const Profile = require('../../models/Profile')
const User = require('../../models/User')


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



// @route       POST api/profile/:experience
// @description add experience to profile
// @access      private

router.post('/experience',passport.authenticate('jwt',{session: false}),(req,res)=>{

    const { errors, isValid } = validateExperienceInput(req.body)

    //checck validation
    if(!isValid){
        return res.status(400).json(errors)
    }

    Profile.findOne({user: req.user.id}).then(profile =>{
        const newExp = {
            title:req.body.title,
            company:req.body.company,
            location:req.body.location,
            from:req.body.from,
            to:req.body.to,
            current: req.body.current,
            description:req.body.description
        }
        //add to experiene array
        profile.experience.unshift(newExp)

        profile.save().then(profile => res.json(profile))
    })
})


// @route       POST api/profile/education
// @description add education
// @access      private

router.post('/education',passport.authenticate('jwt',{session: false}),(req,res)=>{

    const { errors, isValid } = validateEducationInput(req.body)

    //checck validation
    if(!isValid){
        return res.status(400).json(errors)
    }

    Profile.findOne({user: req.user.id}).then(profile =>{
        const newEdu = {
            school:req.body.school,
            degree:req.body.degree,
            fieldofstudy:req.body.fieldofstudy,
            from:req.body.from,
            to:req.body.to,
            current: req.body.current,
            description:req.body.description
        }
        //add to experiene array
        profile.education.unshift(newEdu)

        profile.save().then(profile => res.json(profile))
    })
})


// @route       DELTE api/profile/experience/:exp_id
// @description delete an experience from profile
// @access      private

router.delete('/experience/:exp_id',passport.authenticate('jwt',{session: false}),(req,res)=>{

    Profile.findOne({user: req.user.id}).then(profile =>{
        
        //get the experience index
        const index = profile.experience.map(item => item.id).indexOf(req.params.exp_id)

        //splice out of the array
        profile.experience.splice(index,1)

        //resave after removing that experience
        profile.save().then(profile => res.json(profile))
        .catch(err => res.status(404).json(err))
    })
})

// @route       DELTE api/profile/education/:edu_id
// @description delete an education from profile
// @access      private

router.delete('/education/:exp_id',passport.authenticate('jwt',{session: false}),(req,res)=>{

    Profile.findOne({user: req.user.id}).then(profile =>{
        
        //get the experience index
        const index = profile.education.map(item => item.id).indexOf(req.params.edu_id)

        //splice out of the array
        profile.education.splice(index,1)

        //resave after removing that experience
        profile.save().then(profile => res.json(profile))
        .catch(err => res.status(404).json(err))
    })
})

// @route       DELTE api/profile
// @description delete user and profile
// @access      private

router.delete('/',passport.authenticate('jwt',{session: false}),(req,res)=>{

    Profile.findOneAndRemove({user:req.user.id}).then(() =>{
      User.findOneAndRemove({_id:req.user.id}).then(()=>{
          res.json({success:true})
      })  
    })


})





module.exports = router;