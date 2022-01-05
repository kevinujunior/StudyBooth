import React from 'react';
import styles from './ImageLoading.css';

const ImageLoading = (props) => {
    return (
        <div style={{overflow:'hidden', width:`${props.width}`, height:`${props.height}`, borderRadius:`${props.borderRadius}`}}>
            <div className={styles.ImageLoading}></div>
        </div>
    )
}

export default ImageLoading;