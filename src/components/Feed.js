import React, { useState, useEffect } from 'react';
import Parse from '../parseConfig';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');

    // Fetch posts from Parse server
    const fetchPosts = async () => {
        try {
            const query = new Parse.Query('Post');
            query.include('author');
            const results = await query.find();
            setPosts(results);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Handle liking a post
    const handleLike = async (post) => {
        const currentUser = Parse.User.current();
        if (!currentUser) {
            alert('You need to be logged in to like posts.');
            return;
        }

        post.addUnique('likes', currentUser);

        try {
            await post.save();
            // Update posts state with updated like count
            setPosts((prevPosts) =>
                prevPosts.map((p) => (p.id === post.id ? post : p))
            );
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

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
            // Clear content and refresh posts after successful post
            setContent('');
            fetchPosts(); // Refresh the feed after posting
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div>
            {Parse.User.current() && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Create Post:</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit">Post</button>
                </form>
            )}
            {posts.map((post) => (
                <div key={post.id} className="post-container">
                    <p>{post.get('content')}</p>
                    <p>by: {post.get('author').get('username')}</p>
                    <button onClick={() => handleLike(post)}>
                        Like ({post.get('likes') ? post.get('likes').length : 0})
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Feed;
