let { 
    CreatePost,
    GetAllPost,
    GetPostById,
    DeletePostById,
    Likes,
    Un_likes,
    Comments,
    DeleteComment
} = require('../routes/posts')
let { authApi } = require('../routes/auth')
let { 
    UserProfile,
    CreateProfile,
    GetAllProfile,
    GetUserById,
    DeleteUser,
    AddExperience,
    DeleteExperience,
    AddEducation,
    DeleteEducation,
    GitHubProfile,
    GetUser
} = require('../routes/profile')
let { userApi,getUser , userRegister, login } = require('../routes/user')
let  { check } = require('express-validator')
let { Authenticate } = require('../middleware/Authenticate')
module.exports = {
    APP: async (app) => {
        app.post('/api/post',
                    [Authenticate,
                        check('text', 'Text is required').not().isEmpty()
                    ],
                    CreatePost);
        app.get('/api/get/posts', [Authenticate], GetAllPost);
        app.get('/api/post/:user_id', [Authenticate], GetPostById);
        app.delete('/api/delete/post/:id', [Authenticate], DeletePostById);
        app.get('/auth', authApi);
        app.get('/user', userApi);

        app.post('/api/register',[
            check('username', 'Username is required').not().isEmpty(),
            check('last_name', "Last name is required").not().isEmpty(),
            check('password', 'Please enter a password with 6 to 12 digit').isLength({min: 6}),
            check('email', 'Email is required').isEmail()
        ],
        userRegister);

        app.put('/api/like/:id', [Authenticate], Likes);
        app.put('/api/unlike/:id', [Authenticate], Un_likes);
        app.post('/api/comment/:id', [Authenticate, 
            check('text', 'Text is required').not().isEmpty()
        ], Comments);
        app.delete('/api/delete/comment/:comment_id/:post_id', [Authenticate], DeleteComment)
        app.post('/auth/login', [
            check('email', 'Email is required').isEmail(),
            check('password', 'Password is required').not().isEmpty(),
        ], login);
        
        app.get('/api/auth', [Authenticate], getUser);
        app.get('/api/me', [Authenticate], UserProfile);
        app.post('/api/profile', [Authenticate], [
            check('status', "Status is required").not().isEmpty(),
            check('skills', 'Skills is required').not().isEmpty()
        ], CreateProfile);
        
        app.get('/api/get_all_profile', GetAllProfile);
        app.get('/api/profile/:user_id', GetUserById);
        app.delete('/api/profile/delete', [Authenticate], DeleteUser);
        app.get('/api/me', [Authenticate], GetUser);
        
        app.put('/api/add/experience', [Authenticate], [
            check('title', 'Title is required').not().isEmpty(),
            check('company', 'Company is required').not().isEmpty()
        ], AddExperience);

        app.delete('/api/delete/experience/:exp_id', [Authenticate], DeleteExperience);

        app.put('/api/add/education', [Authenticate], [
            check('school', 'School is required').not().isEmpty(),
            check('degree', 'Degree is required').not().isEmpty()
        ], AddEducation);

        app.delete('/api/delete/education/:edu_id', [Authenticate], DeleteEducation);
        app.get('/github/:username', GitHubProfile);
    }
}