import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./News.css"; // Importă fișierul CSS pentru stilizarea știrilor

function News() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          q: "computer science",
          sources: "bbc-news",
          apiKey: "bfa7c2b03e764ef4afcab8d54f83467c",
        },
      });
      setArticles(response.data.articles);
    };

    fetchData();
  }, []);

  return (
    <div className="news_body">
      <h2>Latest News</h2>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="article-link"
            >
              {" "}
              {/* Adaugă clasa 'article-link' */}
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default News;
