import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SideBarChat from "./SideBarChat/SideBarChat";
import "./SideBarChats.css";

function SideBarChats() {
  const [messages, getAll] = useState([]);

  {
    /*useEffect(() => {
    axios
      .get("http://localhost:3000/messages/all")
      .then((response) => {
        getAll(response.data.messages);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);*/
  }

  return (
    <div className="side_bar_chats_body">
      <h1>Chats</h1>
      {/*  {messages.map((message) => (
          <SideBarChat
            key={post.id}
            username={`User ${message.author_id}`}
            content={message.description}
          />
        ))}*/}
      <Link to="/">
        <SideBarChat
          id={0}
          username={"User1"}
          content={"LastMessageLastMessageLastMessageLastM"}
        />
      </Link>
      <Link to="/">
        <SideBarChat
          id={0}
          username={"User2"}
          content={"LastMessageLastMessageLastMessageLastM"}
        />
      </Link>
      <Link to="/">
        <SideBarChat
          id={0}
          username={"User3"}
          content={"LastMessageLastMessageLastMessageLastM"}
        />
      </Link>
      <Link to="/">
        <SideBarChat
          id={0}
          username={"User4"}
          content={"LastMessageLastMessageLastMessageLastM"}
        />
      </Link>
      <Link to="/">
        <SideBarChat
          id={0}
          username={"User5"}
          content={"LastMessageLastMessageLastMessageLastM"}
        />
      </Link>
    </div>
  );
}

export default SideBarChats;
