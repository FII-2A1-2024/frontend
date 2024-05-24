import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./News.css"; // Importă fișierul CSS pentru stilizarea știrilor

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNews= async () => {
      try{
      const response = await axios.get("https://api.currentsapi.services/v1/latest-news", {
        params: {
          language: 'en',
          country: 'US',
          category: 'technology',
          apiKey: 'X1TaQkHIhvK2rMvpirkmNH6ViF12k0rWOotbzmkQzpE3y6g3',
        },
      });
      setArticles(response.data.news.slice(0, 10));
      setLoading(false);
    }
    catch(error){
      console.error('Error fetching news:' , error);
    }
  };
    fetchNews();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="news_body">
      <h2 className="news_title">News</h2>
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
