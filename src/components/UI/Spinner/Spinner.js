import React from 'react';

import classes from './Spinner.css';
const spinner = () => (
    <div className={classes.Container}>
        <div className = {classes.Loader}>Loading...</div>
    </div>
) ;


export default spinner;