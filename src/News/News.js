// Notícias.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./news.css"; 

const News = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines", {
            params: {
              country: 'pt',
              apiKey: '76cc2ede4a9f4270b2d1c47e09711381'
            }
          }
        );
        setNoticias(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar notícias:', error);
        setError('Erro ao buscar notícias. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      adjustWidgetSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const adjustWidgetSize = () => {
    const newsContainer = document.querySelector('.news-container');
    if (!newsContainer) return;

    if (newsContainer.clientHeight > 410) {
      newsContainer.style.height = "410px";
    } else {
      newsContainer.style.height = "auto";
    }
  };

  if (error) {
    return <div className="error-message">Erro ao carregar notícias: {error}</div>;
  }

  return (
    <div className="news-container">
      <h2>Principais Manchetes</h2>
      {loading ? (
        <p>Carregando notícias...</p>
      ) : (
        <div className="news-content">
          {noticias.map((noticia, index) => (
            <div key={index} className="news-article">
              <a
                href={noticia.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>{noticia.title}</h3>
              </a>
              <p>{noticia.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
