import React from 'react';

import classes from './Activity.css';

import ActivityItem from './ActivityItem/ActivityItem';

const Activity = () => {
    return (
        <div className={classes.Activity}>
            <h3>Your Activity</h3>
            <ActivityItem />
            <ActivityItem />
        </div>
    );
}

export default Activity;