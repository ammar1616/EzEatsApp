import React, { useState } from 'react';
import Parse from '../parseConfig';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user, setUser] = useState(null);

    // Validate email format
    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    // Validate password strength
    const validatePassword = (password) => {
        return (
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            password.length >= 8
        );
    };

    // Handle signup form submission
    const handleSignup = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            alert('Invalid email format');
            return;
        }
        if (!validatePassword(password)) {
            alert('Password must be at least 8 characters long and include uppercase, lowercase, and numbers');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const newUser = new Parse.User();
        newUser.set('username', username);
        newUser.set('password', password);
        newUser.set('email', email);

        try {
            await newUser.signUp();
            setUser(newUser);
            alert('Signup successful!');
        } catch (error) {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        }
    };

    return user ? (
        <div>Welcome, {user.get('username')}!</div>
    ) : (
        <form onSubmit={handleSignup}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
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
            <div>
                <label>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Signup</button>
        </form>
    );
};

export default Register;
