'use strict';
require('dotenv').config();
let User = require('../database/schema/User');
let  { validationResult } = require('express-validator')
let {url} = require('gravatar');
var jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

module.exports = {
    userApi: async (req, res) => {
        return res.send('User APi')
    },
    userRegister : async (req, res) => {
        let { 
            username, last_name, email, password 
        } = req.body;
        let errors = validationResult(req);
        /**IF EMPTY USER FIELDS */
        if(!errors.isEmpty()){
            return res.status(400).json({
                        errors: errors.array()
                    })
        }
        
        /**IF USER EXIST */       
        let userCheck = await User.findOne({email});

        try {
        
         let avatar = url(
             email,
             {
                 s: '200',
                 r: 'pg',
                 d: 'mm'
             }
         )
           if(!userCheck) {
                let newUser = new User({
                    username: username,
                    last_name: last_name,
                    avatar,
                    email: email,
                    password: password,
                })
                let salt = await bcrypt.genSalt(10);
                let hash = await bcrypt.hash(password, salt);
                newUser.password = hash;

                let saved = await newUser.save();
                if(saved) {
                    let payload = {
                        user: {
                            id: saved.id
                        }
                    }
                    jwt.sign(payload, 
                        process.env.JWTSECRET,
                        {expiresIn: '1h'},
                        (err, token) => {
                           if(err) throw err;
                          
                           res.status(200).send({
                            success: true,
                            token: token,
                            message: 'User has been saved Successfully'
                        })
                    })
                } else {
                    return res.status(400).send({errors: [{
                        success: false,
                        message: 'Something went wrong while saving'
                    }]})
                }
            } else {
                return res.status(403).send({errors: [{
                    success: false,
                    message: 'Already register!'
                }]})
            }
        } catch(e) {
            console.log('ERROR WHILE WHILE USER CREATION', e)
            res.status(500).send({errors:[{
                success: false,
                message: 'Something went wrong'
            }]})
        }
    },
    getUser: async (req, res) => {
        if(req.user.id) {
            let userDetail = await User.findById(req.user.id).select('-password -__v')
            userDetail ? 
                res.status(200).send(userDetail) : res.status(404).send({message: 'User not found'});
        } else {
            res.status(401).send({errors: [{message: 'Something went wrong'}]})
        }
    },
    login: async (req, res) => {
        
        let { email, password } = req.body;
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).send({
                errors:  errors.array()
            })
        }
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).send({errors: [{msg: "Invalid Credentials"}]})
        }

        let pass = await bcrypt.compare(password, user.password)

        if(!pass) {
            return res.status(400).send({errors: [{msg: "Invalid Credentials"}]})
        }
        try {

            let payload = {
                user:{
                    id: user.id
                }
            };
    
            jwt.sign(
                payload,
                process.env.JWTSECRET,
                {expiresIn: '1h'},
                (err, token) => {
                    if(err) throw err;
                    res.status(200).send({
                        success: true,
                        token: token
                    })
                }
            );
        } catch(e) {
            console.log("ERROR  WHILE LOGIN", e)
            return res.status(500).send({errors: [{msg: "Server error!"}]})
        }
    }
}