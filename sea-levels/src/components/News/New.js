import { useEffect, useState } from "react";
import axios from "axios";

const New = (props) => {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState(props.town);
  const [toggle, setToggle] = useState(false);


  useEffect(() => {
    const fetchNews = async () => {
      const getAllNews = await axios.get(`https://newsapi.org/v2/everything?q=${search}&apiKey=${process.env.REACT_APP_NEWS_KEY}
      `);
      const newsData = getAllNews.data.articles;
      setNews(newsData);
    };
    fetchNews();
  }, [toggle]);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToggle((curr) => !curr);
  };

  return (
    <div>
      <h1>News Feed</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          name="keyword"
          id="keyword"
          placeholder="Enter City"
          value={search}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      {news.map((feed) => (
        <a href={feed.url} target='_blank'>
        <div>
          {feed.author}
          {feed.publishedAt.split('', 10)}
          {feed.title}
          <img src={feed.urlToImage} alt={feed.title} />
        </div>
        </a>
      ))}
    </div>
  );
};

export default New;
