import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home.js';
import './components/Home.css';
import BlogPage from './components/BlogPage.js';
import './components/BlogPage.css';
import About from './components/About.js';
import './components/About.css';
import './components/NavBar.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogpage" element={<BlogPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
