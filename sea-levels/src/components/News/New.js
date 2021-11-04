import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './New.css';

const New = ({ town }) => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const { data } = await axios.get(`https://newsapi.org/v2/everything?q=weather&pageSize=6&apiKey=${process.env.REACT_APP_NEWS_KEY}`);
            
            if (!!data?.articles) {
                setNews(data.articles);
            }
        };

        fetchNews();
    }, [town]);

    return (
        <div className="news-feed">
            <h3>News Feed</h3>
            <div className="news-container">
                {news.map(feed => {
                    return (
                        <a 
                            key={`news-item-${feed.url}`}
                            href={feed.url} 
                            target='_blank'>
                            <div 
                                className="img-container" 
                                style={{
                                    backgroundImage: `url(${feed.urlToImage})`,
                                }}
                            />
                            <div className="content-container">
                                <span>
                                    {`${feed.author} - `}
                                    <span className="light">{feed.publishedAt.split('', 10)}</span>
                                </span>
                                <h4>{feed.title}</h4>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default New;
