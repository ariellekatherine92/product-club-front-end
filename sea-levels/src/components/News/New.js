import{ useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom';


const New = () => {
  const location = useSelector((state) => state.location)
  console.log('Location',location)
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const getAllNews = await axios.get(`https://newsapi.org/v2/everything?q=${location}&apiKey=${process.env.REACT_APP_NEWS_KEY}
      `);
      const newsData = getAllNews.data.articles;
      setNews(newsData)
      console.log(newsData)
    }
    fetchNews()
  },[])
  return (
    <div>
      <h1>News Feed</h1>
      {news.map((feed) => (
        <div>
          {feed.title}
          {feed.publishedAt}
          {feed.description}
          {feed.author}
          </div>
      ))}
      
    </div>
  );
};

export default New;