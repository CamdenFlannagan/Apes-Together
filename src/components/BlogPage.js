import React from 'react';
import NavBar from './NavBar.js';
import { prac_data } from './Practice_Data.js';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase.js';

function Post() {
  const { state } = useLocation();
  const blogPostId = state.blogPostId;

  const [ blogPost, setBlogPost] = useState(<></>);

  useEffect(() => {
    const getBlogPost = async () => {
      const postRef = doc(db, "blogposts", blogPostId);
      const postSnap = await getDoc(postRef);
      const postData = postSnap.data();
      setBlogPost(
        <div className="Screen">
          <div className="Post">
            <h2 className="Title">{postData.title}</h2>
            <p className="Author">{postData.author}</p>
            <div>{postData.body}</div>
            <div className="Banana">
              <img src={require('./banana.png')} alt="banana" width="50px"/>
            </div>
          </div>
        </div>
      );
    };
    getBlogPost();
  }, [blogPost]);

  return (
    <div>
      {blogPost}
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