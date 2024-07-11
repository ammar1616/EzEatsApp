import React, { useState } from 'react';
import Parse from '../parseConfig';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // 

    // Validate email format
    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await Parse.User.logIn(email, password);
            setUser(user);
            // Navigate to current route to refresh the page
            // navigate('/feed');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    // Handle logout
    const handleLogout = async () => {
        await Parse.User.logOut();
        setUser(null);
        navigate('/feed');
    };

    const handleFeedNavigation = () => {
        navigate('/feed'); // Navigate to feed page quickly
    };

    return user ? (
        <div>
            <li className="nav-item welcome">Welcome, {user.get('username')}!</li>
            <li className="nav-item"><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
            <li className="nav-item feed-link" onClick={handleFeedNavigation}>Feed</li>
        </div>
    ) : (
        <form onSubmit={handleLogin}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
            <p>
                Don't have an account? <Link to="/register">Register here</Link>.
            </p>
        </form>
    );
};

export default Login;
