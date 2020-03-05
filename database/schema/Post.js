let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let newPost = new Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        text: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },
        likes: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            }
        ],
        comments: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                },
                text: {
                    type: String,
                    required: true
                },
                name: {
                    type: String
                },
                avatar: {
                    type: String
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
},{timestamps: true})

let Post = mongoose.model('post', newPost);

module.exports = {
    Post
}