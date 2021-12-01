import React from 'react';
import classes from './LoadingPage.css';

const LoadingPage  = () => {

    return (
        <div className={classes.LoadingPage}>
            <div className={classes.content}>
                <div>
                    <img src="/images/cool_nice.png" />
                </div>
                <div className={classes.lds_ellipsis}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default LoadingPage;