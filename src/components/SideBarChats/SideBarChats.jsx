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
      .get(`${import.meta.env.VITE_URL_BACKEND}/messages/all`)
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
      <h4>Chats</h4>
      {/*  {messages.map((message) => (
          <SideBarChat
            key={post.id}
            username={`User ${message.author_id}`}
            content={message.description}
          />
        ))}*/}
      <Link to="/main">
        <SideBarChat
          id={0}
          username={"User1"}
          content={"Ce faci?"}
        />
      </Link>
      <Link to="/main">
        <SideBarChat
          id={0}
          username={"User2"}
          content={"Visez la vacanță."}
        />
      </Link>
      <Link to="/main">
        <SideBarChat
          id={0}
          username={"User3"}
          content={"Eu visez la somn."}
        />
      </Link>
      <Link to="/main">
        <SideBarChat
          id={0}
          username={"User4"}
          content={"Eu visez că visez."}
        />
      </Link>
      <Link to="/main">
        <SideBarChat
          id={0}
          username={"User5"}
          content={"Hai că ne-am întrecut!"}
        />
      </Link>
    </div>
  );
}

export default SideBarChats;
