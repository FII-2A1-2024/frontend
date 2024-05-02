/**
User: Daniela Rusu
Date: 9 aprilie 2024
Descriere: Facut template-ul la post, trebuie de vazut cum punem hover si click  la butoanele de like/dislike, comment si share
*/
import React, { useState } from 'react';
import './post.css';
import userProfile from './icons/user_profile.svg';
import threeDots from './icons/3-dots.svg';
import shareSVG from './icons/share.svg';
import downVotesSVG from './icons/shift_down.svg';
import upVotesSVG from './icons/shift_up.svg';
import commentsSVG from './icons/chat_bubble.svg';

import Comments from '../comments/Comments';

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
    <div>
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
          <div className="btn btn-upvotes" onClick={() => handleVote('upvote')}>
             <img src={upVotesSVG} alt="nush" />
          </div>
          <p>{upVotesCount + (voted === 'upvote' ? 1 : 0)}</p>
          <div className="btn btn-downVotes"  onClick={() => handleVote('downvote')}>
          <img src={downVotesSVG} alt="nush"/>
          </div>
        
        </div>

        {/* Comments Button*/}
        <div className="feedback-container comm-btn">
          <div className="btn">
          <img src={commentsSVG} alt="nush" className='SVG' />
          </div>
          
          <p>{commentsCount}</p>
        </div>

        {/* Shares Button */}
        <div className="feedback-container">
          <div className="btn btn-share">
          <img src={shareSVG} alt="nush" />
          </div>
          <p>Share</p>
        </div>
      </div>
    </div>
   { /*<Comments currentUserId = "1"/>*/}
   <Comments/>
    </div>
  );
};

export default Post;
