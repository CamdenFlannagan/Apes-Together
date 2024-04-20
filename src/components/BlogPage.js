import React from 'react';
import NavBar from './NavBar.js';
import { prac_data } from './Practice_Data.js';

const blogPost = prac_data.get(1);

function Post() {
  return (
    <div className="Post">
      <h2 className="Title">{blogPost.title}</h2>
      <p className="Author">{blogPost.author}</p>
      {blogPost.paragraphs.map(paragraph => {
        return <p className="Paragraph">{paragraph}</p>;
      })}
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