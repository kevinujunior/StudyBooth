import React from 'react';

import classes from './TopNews.css';
import NewsItem from './NewsItem/NewsItem';

const topNews = () => {

    return (
        <div className={classes.TopNews}>
            <div className={classes.heading}>
                <h3>Top News</h3>
            </div>
            <div>
                <NewsItem />
                <NewsItem />
                <NewsItem />
            </div>
        </div>
    );
}

export default topNews;