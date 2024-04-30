import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Comment.css";

function Comment() {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const URL_BACKEND = "https://example.com/comment"; // Înlocuiește cu URL-ul backend-ului

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return; // Dacă comentariul este gol, nu face nimic

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Trimite comentariul către backend
      await axios.post("URL_BACKEND", { comment });
      setComment(""); // Resetează câmpul de comentarii după trimitere
      setSuccess(true); // Setează succesul la true după ce comentariul a fost trimis cu succes
    } catch (error) {
      setError("A apărut o eroare. Vă rugăm să încercați din nou.");
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    // Dacă se apasă tasta Enter și nu se apasă și tasta Shift
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Previne comportamentul implicit de a adăuga un newline în textarea
      handleSubmit(e); // Trimite formularul
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment_body">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a comment..."
        required
        className="comment_content"
      ></textarea>
      {isLoading ? (
        <p>Sending...</p>
      ) : success ? (
        <p>Sent!</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : null}
    </form>
  );
}

export default Comment;
