import React from 'react';

import classes from './TodaysWord.css';

const todaysWord = () => {
    return (
        <div className={classes.TodaysWord}>
            <h3>Today's Word</h3>
            <p>Procastination</p>
            <div>
                <p>noun</p>
                <p>the action of delaying and postponding something.</p>
                <p>"your first tip is to avoid procastination"</p>
            </div>
        </div>
    );
}

export default todaysWord;