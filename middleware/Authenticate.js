'use strict';
require('dotenv').config();
let jwt = require('jsonwebtoken');

module.exports = {
    Authenticate: async (req, res, next) => {
        let token = req.header('Authorization');
        
        if(!token) return res.status(401).send({errors: [{message: 'Token is not provided authorization denied'}]})

        try {
            let decode = jwt.verify(token, process.env.JWTSECRET);
            req.user = decode.user;
            next();
        } catch(e) {
            res.status(401).send({errors: [{message: 'Token is invalid'}]})
        }
    }
}