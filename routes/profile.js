let Profile = require('.././database/schema/Profile');
let {validationResult} = require('express-validator');
let conf = require('../config');
let request = require('request');

module.exports = {
    /** GET LOGIN USER PROFILE */

    UserProfile: async (req, res) => {
        let profile = await Profile.findOne({user: req.user.id})
                                .populate('user',
                                     ['first_name', 'last_name', 'avatar']
                                     );
        if(!profile) {
            return res.status(400).send({
                success: false,
                message: "There is no user with this user id"
            })
        }

        return res.status(200).send({
            success: true,
            data: profile
        })
    },
    CreateProfile: async (req, res) => {
        let {
            company,
            location,
            website,
            status,
            skills,
            bio,
            githubusername,
            facebook,
            youtube,
            linkedin,
            instagram,
            twitter,
            github
        } = req.body;

        let errors = validationResult(req);

        if(!errors.isEmpty()) {return res.status(400).send({errors: errors.array()})
        }
        let profileDetail = {};
        if(req.user.id) profileDetail.user = req.user.id;
        if(company) profileDetail.company = company;
        if(location) profileDetail.location = location;
        if(website) profileDetail.website = website;
        if(bio) profileDetail.bio = bio;
        if(githubusername) profileDetail.githubusername = githubusername;
        if(status) profileDetail.status = status;
        if(skills) profileDetail.skills = skills.split(',').map(skill => skill.trim());

        profileDetail.social = {}
        if(facebook) profileDetail.social.facebook = facebook;
        if(youtube) profileDetail.social.youtube = youtube;
        if(linkedin) profileDetail.social.linkedin = linkedin;
        if(instagram) profileDetail.social.instagram = instagram;
        if(twitter) profileDetail.social.twitter = twitter;
        if(github) profileDetail.social.github = github;

        try {
            let profile = await Profile.findOne({user: req.user.id})
            if(profile) {
               profile=  await Profile.findOneAndUpdate(
                             {user: req.user.id},
                             {$set: profileDetail},
                             {new: true}
                            )
                    return res.status(200).send({
                        success: true,
                        data: profile
                    })
            }

            profile = new Profile(profileDetail)

            await profile.save()

            res.status(200).send({
                success: true,
                data: profile
            })
        } catch (err) {
            console.log(err)
            return res.status(500).send({
                success: false,
                message: "Server Error"
            })
        }
    },
    GetAllProfile: async (req, res) => {
        
        try {
            let profile = await Profile.find()
                                    .populate('user',
                                            ['username', 'last_name', 'avatar']
                                        );
            return res.status(200).send({
                success: true,
                data: profile
            });
        } catch (err) {
            console.log('USER ERROR', err.message)
            return res.status(500).send({
                success: false,
                message: err.message
            })
        }
    },
    GetUser: async (req, res) => {
        
        try {
            let profile = await Profile.findOne({user: req.user.id})
                                    .populate('user',
                                            ['username', 'last_name', 'avatar']
                                        );
            if(!profile) return res.status(400).send({success: false, message: 'There is no profile for this user'})
            return res.status(200).send({
                success: true,
                data: profile
            });
        } catch (err) {
            console.log('USER ERROR', err.message)
            return res.status(500).send({
                success: false,
                message: err.message
            })
        }
    },
    GetUserById: async (req, res) => {
        let id = req.params.user_id;

        if(!id) return res.status(400).send({errors: [{error: 'Fields is missing'}]});

        
        try {
            let profile = await Profile.findById({_id: id}).populate({path: 'user', select: 'username last_name avatar -_id'});

            if(!profile) return res.status(400).send({error: [{error: 'User not found'}]});
            return res.status(200).send({
                success: true,
                data: profile
            })
        } catch (error) {
            console.log('ERROR PROFILE', error.message)
            if(error.kind == 'ObjectId') 
                    return res.status(400).send({errors:[{
                        success: false,
                        message: "User not found"
                    }]})
            return res.status(500).send({
                message: 'Server Error'
            })
        }
    },
    DeleteUser:  async (req, res) => {
        try {
            if(!req.user.id) return res.status(400).send({error: [{error: 'User not found'}]})

            await Profile.findByIdAndRemove({_id: req.user.id});
            await User.findByIdAndRemove({_id:  req.user.id})
            return res.status(200).send({
                success: true,
                message: 'User & Profile Deleted'
            })
        } catch (error) {
            console.log("ERROR DELETED", error.message);
            return res.status(500).send({
                message: "Server Error"
            })
        }
    },
    AddExperience: async (req, res) => {
        let {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        let newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }
        try {
            let errors = validationResult(req);

        if(!errors.isEmpty())
            return res.status(400).send({errors: [{error: errors.array()}]});
        
        let profile = await Profile.findOne({user: req.user.id});
           profile.experience.unshift(newExp);
           await profile.save();

           return res.status(200).send({
               success: true,
               data: profile
           })

        } catch (error) {
         
         console.log(error.message);
         res.status(500).send({error: [{error: 'Server error'}]})

        }
    },
    DeleteExperience: async (req, res) => {
        try {
            let profile = await Profile.findOne({user: req.user.id});

            profile.experience.shift();
            await profile.save();
            return res.status(200).send({
                success: true,
                data: profile
            })

        } catch (error) {

            console.log(error.message);
            res.status(500).send({error: [{error: "Server error"}]})
        }
    },
    AddEducation: async (req, res) => {
        let {
            school,
            degree,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        let newEdu = {
            school,
            degree,
            location,
            from,
            to,
            current,
            description
        };

        let error = validationResult(req);
        if(!error.isEmpty())
                return res.status(400).send({error: [{error: error.array()}]})

        let profile = await Profile.findOne({user: req.user.id});

        profile.education.unshift(newEdu);
        await profile.save();
        return res.status(200).send({
            success: true,
            data: profile
        })
    },
    DeleteEducation: async (req, res) => {
        try {
            let profile = await Profile.findOne({user: req.user.id});
            profile.education.shift();
            await profile.save();
            return res.status(200).send({
                success: true,
                data: profile
            })
        } catch (error) {
            console.log(error.message)
            res.status(500).send({
                success: false,
                message: 'Server Error'
            })
        }
    },
    GitHubProfile: async (req, res) => {
        try {
            console.log(req.params.username)
            let option = {
                uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${conf.GITHUBCLIENT}&client_secret=${conf.GITHUBSECRET}`,
                method: 'GET',
                headers: {'user-agent': 'node.js'}
            }
            request(option, (err, response, body) => {
                if(err) return res.status(400).send({success: false, message: 'Something went wrong'});
                console.log(response)
                if(response.statusCode !== 200) {
                    return res.status(404).send({
                        success: false,
                        message: 'No git repo found'
                    })
                }
                console.log(body, response)
                res.status(200).send(JSON.parse(body));
            })
        } catch (error) {
            console.log("GIT HUB REPO ERROR", error.message);
            res.status(500).send({
                success: false,
                message: 'Server Error'
            })
        }
    }
}