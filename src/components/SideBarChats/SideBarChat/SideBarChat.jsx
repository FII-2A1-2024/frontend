import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SideBarChat.css";
import SideBarChats from "../SideBarChats";
import userProfileIconMessagesSide from "../user-profile-side-messages.svg"

const SideBarChat = ({ id, username, content }) => {
  return (
    <div className="sidebar_message">
      <div className="user-image-holder-chat">
        <img className="user-image" src={userProfileIconMessagesSide} alt="userProfile" />
      </div>

    <div className="side-bar-messages-right-content">
      <div className="user_Header">
        <p>{username}</p>
      </div>

      <div className="message_content">
        <p>{content} </p>
      </div>
      </div>
      
    </div>
  );
};

export default SideBarChat;
