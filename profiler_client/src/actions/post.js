import {
     GET_POSTS,
     POST_ERROR,
     UPDATE_LIKES,
     DELETE_POST,
     ADD_POST,
     GET_POST,
     ADD_COMMENT,
     REMOVE_COMMENT
} from './types';
import axios from 'axios';
import { setAlert } from './alert'
export const getPosts = () => async dispatch => {
    try {
        const post = await axios.get('/api/get/posts');

        dispatch({
            type: GET_POSTS,
            payload: post.data
        })

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {message: error.response.statusText, status: error.response.status}
        })
    }

}
//add likes
export const addLike = id => async dispatch => {
    try {
        const post = await axios.put(`/api/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: post.data}
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {message: err.response.statusText, status: err.response.status}
        })
    }

}
//remove likes
export const removeLike = id => async dispatch => {
    try {
        const post = await axios.put(`/api/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: post.data}
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {message: err.response.statusText, status: err.response.status}
        })
    }

}

//delete post
export const deletePost = id => async dispatch => {
    try {
    const post = await axios.delete(`/api/delete/post/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id
        })
        dispatch(setAlert('Post remove successfully', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {message: err.response.statusText, status: err.response.status}
        })
    }

}

//Add post
export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
    const post = await axios.post('/api/post', formData, config);

        dispatch({
            type: ADD_POST,
            payload: post.data
        })
        dispatch(setAlert('Post created', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {message: err.response.statusText, status: err.response.status}
        })
    }

}

//Get post

export const getPost = id => async dispatch => {
    try {
    const post = await axios.get(`/api/post/${id}`);

        dispatch({
            type: GET_POST,
            payload: post.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {message: err.response.statusText, status: err.response.status}
        })
    }

}

//add Comment 
export const addComment = (id, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const comment = await axios.post(`/api/comment/${id}`, formData, config)
        
        dispatch({
            type: ADD_COMMENT,
            payload: comment.data
        })
        dispatch(setAlert('Comment Added', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {message: err.response.statusText, status: err.response.status}
        })
    }
}

//delete Comment
export const deleteComment = (post_id, comment_id) => async dispatch => {
    try {
        await axios.delete(`/api/delete/comment/${comment_id}/${post_id}`)
        
        dispatch({
            type: REMOVE_COMMENT,
            payload: comment_id
        })

        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {message: err.response.statusText, status: err.response.status}
        })
    }
}