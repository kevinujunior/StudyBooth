import React from 'react';
import styles from './About.css';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className={styles.About}>
            <div className={styles.Normies}>
                <h2>About Us</h2>
                <p>we build this website out of curiosity.</p>
                <div className={styles.Normie}>
                    <h3>Sushant</h3>
                    <IconButton><GitHubIcon /></IconButton>
                    <IconButton><LinkedInIcon /></IconButton>
                </div>
                <div className={styles.Normie}>
                    <h3>Udit</h3>
                    <IconButton><GitHubIcon /></IconButton>
                    <IconButton><LinkedInIcon /></IconButton>
                </div>
            </div>
        </div>
    )
}

export default About;