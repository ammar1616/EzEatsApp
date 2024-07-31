import React, { useState, useEffect } from 'react';
import Parse from '../parseConfig';

const Post = () => {
    const [content, setContent] = useState('');
    let socket = {};

    // Handle submitting a new post
    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentUser = Parse.User.current();
        if (!currentUser) {
            alert('You need to be logged in to post.');
            return;
        }


        const Post = Parse.Object.extend('Post');
        const post = new Post();
        post.set('content', content);
        post.set('author', currentUser);
        try {
            await post.save();
            setContent('');
            alert('Post created successfully!');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    // useEffect(() => {

    //     const fetchPosts = async () => {
    //         try {
    //             const query = new Parse.Query('Post');
    //             socket = await query.subscribe();
    //             socket.on('update', (post) => {
    //                 console.log('New post received:', post);
    //             });
        
    //             socket.on('create', (post) => {
    //                 console.log('New post received:', post);
    //             });
        
    //         } catch (error) {
    //             console.error('Error fetching posts:', error);
    //         }
    //     };
    //     fetchPosts();
    //     return () => {
    //         socket.unsubscribe();
    //     };
    // }, []);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Post Content:</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
            </div>
            <button type="submit">Post</button>
        </form>
    );
};

export default Post;
