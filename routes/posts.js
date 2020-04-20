let { validationResult } = require('express-validator');
let { Post } = require('../database/schema/Post');
let User = require('../database/schema/User');

module.exports = {
    CreatePost: async (req, res) => {
        let errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(401).send({error: [{error: errors.array()}]});

        try {
            let user = await User.findById(req.user.id).select('-password');

            let newPost = new Post({
                text: req.body.text,
                user: user.id,
                avatar: user.avatar,
                name: user.username + user.last_name
            })
            await newPost.save();

            res.status(200).send({
                success: true,
                data: newPost
            })

        } catch (error) {
            console.log(error.message)
            res.status(500).send({
                success: false,
                message: 'Server Error'
            })
        }
    },
    GetAllPost: async (req, res) => {
        try {
            let posts = await Post.find().sort({createdAt: -1});
            res.status(200).send({
                success: true,
                data: posts
            })
        } catch (error) {
            console.log(error.message);
            res.status(500).send({
                success: false,
                message: 'Server Error'
            })
        }
    },
    GetPostById: async (req, res) => {
        try {
            if(!req.params.user_id) return res.status(401).send({success: false, message: 'Fields are missing'})
            let posts = await Post.findById(req.params.user_id);
            if(!posts) return res.status(404).send({success: true, message: 'User not found'});

                res.status(200).send({
                    success: true,
                    data: posts
                })
        } catch (error) {
            console.log(error.message);
            if(error.kind == 'ObjectId') return res.status(404).send({success: false, message: 'Post not found'});
            res.status(500).send({
                success: false,
                message: 'Server Error'
            })
        }
    },
    DeletePostById: async (req, res) => {
        try {
            if(!req.params.id) return res.status(401).send({success: false, message: 'Fields are missing'})
            let post = await Post.findById(req.params.id);
            if(!post) return res.status(404).send({success: true, message: 'Post not found'});

            if(post.user.toString() !== req.user.id) return res.status(401).send({success:false, message: 'User not authorized'});
            
            await post.remove();

                res.status(200).send({
                    success: true,
                    message: "Post removed"
                })
        } catch (error) {
            console.log(error.message);
            if(error.kind == 'ObjectId') return res.status(404).send({success: false, message: 'Post not found'})
            res.status(500).send({
                success: false,
                message: 'Server Error'
            })
        }
    },
    Likes: async (req, res) => {
        try {
            if(!req.params.id)
                    return res.status(401).send({success: false, message: 'Not a valid request'});
            let post = await Post.findById(req.params.id);
            if(!post)
                return res.status(404).send(
                    {
                        success: false,
                        message: "Post not found"
                    });
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(403).send(
                    {
                        success: false,
                        message: 'All ready liked'
                    }); 
            }
                        
            post.likes.unshift({user: req.user.id});
            await post.save();

            return res.status(200).send(
                {
                success: true,
                data: post.likes
            });
                
        } catch (error) {
            console.log(error.message);
            if(error.kind == 'ObjectId') return res.status(404).json({success: false, message: 'Post not found'})
            return res.status(500).send({
                success: false,
                message: 'Server Error'
            })
        }
    },
    Un_likes: async (req, res) => {
        try {
            if(!req.params.id) return res.status(404).send({success: false, message: 'Post not found'});
            let post = await Post.findById(req.params.id);
            if(!post) return res.status(404).send({success: false, message: 'Post not found'});

            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return res.status(403).send({
                    success: false,
                    message: 'Please like first'
                })
            }

            let removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

            post.likes.splice(removeIndex, 1);
            await post.save();
            res.status(200).send({
                success: true,
                data: post.likes
            })

        } catch (error) {
            console.log(error.message);
            if(error.kind === 'ObjectId') return res.status(404).send({success: false, message: 'Post not found'});
            return res.status(500).send({
                success: false,
                message: 'Server Error'
            })
        }
    },
    Comments: async (req, res) => {
        
        let error = validationResult(req);
        if(!error.isEmpty()) return res.status(403).send(
                {error: [{error:  error.array()}]
            })
        
        if(!req.params.id) return res.status(401).send(
                        {
                            success: false,
                            message: 'Bad Request'
                        });
        try {
            let user = await User.findById(req.user.id).select('-password');

            let post = await Post.findById(req.params.id);

            if(!post) return res.status(404).send(
                    {
                        success: false,
                        message: 'Post not found'
                    });
            let newComment = {
                user: req.user.id,
                text: req.body.text,
                name: user.username,
                avatar: user.avatar
            };
            post.comments.unshift(newComment);

            await post.save();

            res.status(200).send(
                {
                    success: true,
                    data: post
                }
            )

        } catch (error) {
            console.log(error.message);
            if(error.kind === 'ObjectId') return res.status(404).send({
                    success: false,
                    message: 'Post Id is invalid'
            });

            return res.status(500).send(
                {
                    success: false,
                    message: "Server error"                    
                });
        }
    },
    DeleteComment: async (req, res) => {
        if(req.params.post_id === undefined || req.params.comment_id === undefined) return res.status(401).send(
            {
                success: false,
                message: 'Bad Request'
            });
            try {
                let post = await Post.findById(req.params.post_id);
                let comments = post.comments.find(comment => comment.id === req.params.comment_id);
                if(!comments) return res.status(404).send(
                    {
                        success: false,
                        message: 'Comment Not Found'
                    }
                )
                if(comments.user.toString() !== req.user.id) return res.status(404).send(
                    {
                        success: false,
                        message: 'User not authorized'
                    }
                )
                 let removeIndex = post.comments.map(comments => comments.user.toString()).indexOf(req.user.id);

                 post.comments.splice(removeIndex, 1);
                 await post.save();

                 return res.status(200).send(
                     {
                         success: true,
                         data: post
                     })
            } catch (error) {
                console.log(error.message);        
                if(error.kind === 'ObjectId') {
                    return res.status(404).send(
                        {
                            success: false,
                            message: 'Comment not found'
                        }
                    )
                }
                return res.status(500).send(
                    {
                        success: false,
                        message: 'Server Error'
                    }
                )
            }   
    }
}