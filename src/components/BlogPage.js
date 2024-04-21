import React from 'react';
import NavBar from './NavBar.js';
import { prac_data } from './Practice_Data.js';
import { useLocation } from 'react-router-dom';

function Post() {
  const { state } = useLocation();
  const blogPost = JSON.parse(state.post);
  return (
    <div className="Post">
      <h2 className="Title">{blogPost.title}</h2>
      <p className="Author">{blogPost.author}</p>
      {blogPost.paragraphs.map(paragraph => {
        return <p className="Paragraph">{paragraph}</p>;
      })}
      <div className="Banana">
        <img src={require('./banana.png')} alt="banana" width="50px"/>
      </div>
    </div>
  )
}

function BlogPage() {
  return (
    <div>
      <NavBar />
      <Post />
    </div>    
  );
}

export default BlogPage;