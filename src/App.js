import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
import Parse from './parseConfig';
import Login from './components/Login';
import Post from './components/Post';
import Feed from './components/Feed';
import Register from './components/Register';

const App = () => {
  const currentUser = Parse.User.current();

  const handleLogout = () => {
    Parse.User.logOut().then(() => {
      // Refresh the page to reflect logged out state
      window.location.reload();
    });
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            {currentUser ? (
              <>
                <li className="welcome">Welcome, {currentUser.get('username')}!</li>
                <li className="right"><Link to="/feed">Feed</Link></li>
                <li className="right"><button onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li className="welcome">Welcome to Our Blog App!</li>
                <li className="right"><Link to="/">Login</Link></li>
              </>
            )}
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={currentUser ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post" element={<Post />} />
            <Route path="/feed" element={currentUser ? <Feed /> : <Navigate to="/feed" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
