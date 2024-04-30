import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home.js';
import './components/Home.css';
import BlogPage from './components/BlogPage.js';
import './components/BlogPage.css';
import About from './components/About.js';
import './components/About.css';
import Login from './components/Login.js';
import './components/Login.css';
import MakeNewPost from './components/MakeNewPost.js';
import './components/MakeNewPost.css';
import './components/NavBar.css';
import { UserProvider } from './UserContext.js';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogpage" element={<BlogPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newpost" element={<MakeNewPost />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
