import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import NavBar from './NavBar.js';
import { recent, popular, tim } from './Practice_Data.js';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useAuth } from '../UserContext.js';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase.js';

import { timSimp, timPoem } from './Practice_Data.js';

function displayPostPreviews(posts) {
  return posts.map(post => {
    return (
      <div className="PostPreview">
        <h3 className="HomeTitle">{post.title}</h3>
        <p>{post.author}, {post.chapter}</p>
      </div>
    );
  });
}

function Recent() {
  const navigate = useNavigate();
  const [ postPreviewDisplay, setPostPreviewDisplay ] = useState([]);
  const [ hasRendered, setHasRendered ] = useState(false);
  const fetchPosts = useCallback(async () => {
    if (hasRendered) return;
    setHasRendered(true);
    const postsSnapshot = await getDocs(collection(db, "blogposts"));
    postsSnapshot.forEach(doc => {
      postPreviewDisplay.push((
        <div>
          <div className="PostPreview" onClick={() => {
            navigate('/blogpage', {state : {blogPostId: doc.id}});
          }}>
            <h3 className="HomeTitle">{doc.data().title}</h3>
            <p>{doc.data().author}, {doc.data().chapter}</p>
          </div>
        </div>
      ));
    });
    setPostPreviewDisplay([...postPreviewDisplay]);
  }, [postPreviewDisplay, hasRendered]);

  useEffect(() => {
    fetchPosts();
  }, [postPreviewDisplay])

  return (
    <div>
      <h2 className="PostTypeHeader">Recent Posts</h2>
        {postPreviewDisplay}
      <div className="LoadMore">Load More</div>
    </div>
  );
}

function Popular() {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="PostTypeHeader">Popular Posts</h2>
      {
        <div className="PostPreview" onClick={() => {
          navigate('/blogpage', {state : {post: JSON.stringify(timSimp)}});
        }}>
          <h3 className="HomeTitle">{tim.title}</h3>
          <p>{tim.author}, {tim.chapter}</p>
        </div>
      }
      {displayPostPreviews(popular)}
      <div className="LoadMore">Load More</div>
    </div>
  );
}

function Following() {
  return (
    <div>
      <p className="LogInMessage"><Link>Sign in</Link> to follow bloggers</p>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const [ postsUIIndex, setPostsUIIndex ] = useState(0);
  const postsUIArray = [<Recent />, <Popular />, <Following />];
  const auth = getAuth();
  const userId = useAuth();

  return (
    <div>
      <NavBar />
      <div className="PostsUIButtons">
        <div className="PostsUIButton" onClick={() => {
          setPostsUIIndex(0);
        }}>Recent</div>
        <div className="PostsUIButton" onClick={() => {
          setPostsUIIndex(1);
        }}>Popular</div>
        <div className="PostsUIButton" onClick={() => {
          setPostsUIIndex(2);
        }}>Following</div>
        <div className="PostsUIButton" onClick={() => {
          if (userId) {
            navigate('/newpost');
          } else {
            navigate('/login');
          }
        }}>
        Create New Post</div>
      </div>
      {postsUIArray[postsUIIndex]}
    </div>
  );
}

export default Home;