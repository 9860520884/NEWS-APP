import React, { useState, useEffect } from "react";
import "./App.css";

const API_KEY = "f3a896bb791844bbb199e0f6d556f514"; // 👉 your NewsAPI key

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("technology");

  const getNews = async () => {
    try {
      const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  // Auto search when query changes (debounced)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        getNews();
      }
    }, 800); // fetch after 800ms delay

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Load default on mount
  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>📰 My News App</h1>
        <input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getNews()}
        />
        <button onClick={getNews}>Search</button>
      </header>

      <main className="news-container">
        {articles.length === 0 ? (
          <h2>No results found</h2>
        ) : (
          articles.map((article, index) => (
            <div key={index} className="article">
              <img
                src={article.urlToImage || "https://via.placeholder.com/400"}
                alt="news"
              />
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default App;
