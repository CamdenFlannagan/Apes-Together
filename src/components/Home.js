import React from 'react';
import { useState } from 'react';
import NavBar from './NavBar.js';
import { recent, popular, tim } from './Practice_Data.js';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useAuth } from '../UserContext.js';

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
  return (
    <div>
      <h2 className="PostTypeHeader">Recent Posts</h2>
      {
        <div>
          <div className="PostPreview" onClick={() => {
            navigate('/blogpage', {state : {post: JSON.stringify(timSimp)}});
          }}>
            <h3 className="HomeTitle">{tim.title}</h3>
            <p>{tim.author}, {tim.chapter}</p>
          </div>
          <div className="PostPreview" onClick={() => {
            navigate('/blogpage', {state : {post: JSON.stringify(timPoem)}});
          }}>
            <h3 className="HomeTitle">What is the Good Life? Apes? No. Love.</h3>
            <p>Tim Schill, Wheaton Chapter</p>
          </div>
        </div>
      }
      {displayPostPreviews(recent)}
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
  const [ postsUIIndex, setPostsUIIndex ] = useState(1);
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
      {userId}
    </div>
  );
}

export default Home;