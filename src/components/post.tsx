/**
User: Daniela Rusu
Date: 9 aprilie 2024
Descriere: Facut template-ul la post, trebuie de vazut cum punem hover si click  la butoanele de like/dislike, comment si share
*/
import React, { useState } from 'react';
import './post.css';
import userProfile from '../media/icons/pikachu.jpg';
import threeDots from '../media/icons/three-dots.svg';
import shareSVG from '../media/icons/arrow-bar-up.svg';
import downVotesSVG from '../media/icons/arrow-down.svg';
import upVotes from '../media/icons/arrow-up.svg';
import comments from '../media/icons/chat-left.svg';

const Post = ({ userName, title, content, upVotesCount, commentsCount }) => {
  const [voted, setVoted] = useState(null); 

  const handleVote = (voteType) => {
    if (voted === voteType) {
      setVoted(null); 
    } else {
      setVoted(voteType); 
    }
  };
  return (
    <div className="post">
      <div className="postHeader">

        <div className="userHeader">
          <img src={userProfile} alt="nush" className="userProfileImage" />
          <h2>{userName}</h2>
        </div>

        <div className="three-dots" >
          <img src={threeDots} alt="nush" />
        </div>

      </div>

      <div className="postArticle">
        <h1>{title}</h1>
        <p>{content} </p>
      </div>

      <div className="feedback-section">

        {/* Likes/DisLike Button */}
        <div className="feedback-container" >
          <div className="btn" onClick={() => handleVote('upvote')}>
             <img src={upVotes} alt="nush" />
          </div>
          <p>{upVotesCount + (voted === 'upvote' ? 1 : 0)}</p>
          <div className="btn"  onClick={() => handleVote('downvote')}>
          <img src={downVotesSVG} alt="nush"/>
          </div>
        
        </div>

        {/* Comments Button*/}
        <div className="feedback-container">
          <div className="btn">
          <img src={comments} alt="nush" className='SVG' />
          </div>
          
          <p>{commentsCount}</p>
        </div>

        {/* Shares Button */}
        <div className="feedback-container">
          <div className="btn">
          <img src={shareSVG} alt="nush" />
          </div>
          <p>Share</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
