import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SideBarChat.css";
import SideBarChats from "../SideBarChats";

const SideBarChat = ({ id, username, content }) => {
  return (
    <div className="sidebar_message">
      <div className="user_Header">
        <h4>{username}</h4>
      </div>

      <div className="message_content">
        <p>{content} </p>
      </div>
    </div>
  );
};

export default SideBarChat;
