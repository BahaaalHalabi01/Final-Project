const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

//load input validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

const User = require('../../modules/User')

// @route       GET api/users/test
// @description Tests users route
// @access      public route
router.get('/test',(req,res) => res.json({msg:'Users Works'}))


// @route       GET api/users/register
// @description Register user
// @access      public route

router.post('/register',(req,res) => {
    const { errors, isValid} = validateRegisterInput(req.body)
    //checking validation ( empty)
    if(!isValid){
        return res.status(400).json(errors)
    }

    User.findOne({email: req.body.email}).then(user => {
        if(user){
            errors.email = 'Email already exists'
            return res.status(400).json(error)
        }else{
            
            const avatar = gravatar.url(req.body.email,{
                s: '200', //size
                r: 'pg', //rating
                d: 'mm', //default picture
            })

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            })

            bcrypt.genSalt(10,(err,salt) => {
                bcrypt.hash(newUser.password,salt,(err,hash) =>{
                    if(err) throw err
                    newUser.password = hash
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    })

})

// @route       GET api/users/login
// @description login user / returning the JWT token
// @access      public route

router.post('/login', (req,res) => {
    const { errors, isValid} = validateLoginInput(req.body)
    //checking validation ( empty)
    if(!isValid){
        return res.status(400).json(errors)
    }

    const {email, password} = req.body
    // const email = req.body.email
    // const password = req.body.password

    //find the user by email
    User.findOne({email})
    .then(user => {

        
        //check for user
        if(!user){
            errors.email = 'user not found'
            return res.status(404).json(errors)
        }

        // check password

        bcrypt.compare(password,user.password).then(isMatch => {
            if(isMatch){
                //User is matched
                const payload = {id: user.id, name :user.name, avatar:user.avatar} //for jwt

                //sign the token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {expiresIn: 3600},
                     (err,token) =>{
                         res.json({
                             success: true,
                             token: `Bearer ${token}`
                         })

                })
                
            }else {
                errors.password = 'password incorrect'
                return res.status(400).json(errors)
            }
        })

    })

})


// @route       GET api/users/current
// @description return the current user
// @access      private route
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res) =>{
    const {id,name,email} = req.user
    res.json({id,name,email})

})


module.exports = router;