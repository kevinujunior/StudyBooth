import React, {useEffect} from 'react';
import styles from './About.css';

import { useHistory } from 'react-router-dom';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { IconButton } from '@mui/material';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'

const About = (props) => {

    let history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            console.log("function called")
            props.onSetPageLoading();
        },300)

        return () => {
            if (history.action === "POP") {
                // props.history.replace('/home')
                props.onChangePage('/home', null, () => {
                    props.history.replace('/home')
                })
            }
        }

    },[history])

    return (
        <div className={[styles.About, props.theme === 'dark' ? styles.Dark : null].join(" ")}>
            <div className={styles.Normies}>
                <h2>About Us</h2>
                <p>we build this website out of curiosity.</p>
                <div className={styles.Normie}>
                    <h3>Sushant</h3>
                    <IconButton><GitHubIcon className={styles.Icons}/></IconButton>
                    <IconButton><LinkedInIcon className={styles.Icons} /></IconButton>
                </div>
                <div className={styles.Normie}>
                    <h3>Udit</h3>
                    <IconButton><GitHubIcon className={styles.Icons}/></IconButton>
                    <IconButton><LinkedInIcon className={styles.Icons}/></IconButton>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        theme: state.theme.theme,
    }
}

const mapDispathToProps = dispatch => {
    return {
        onChangePage : (path, userId, callBack) => dispatch(actions.changePage(path, {userId})).then(() => callBack()),
        onSetPageLoading: () => dispatch(actions.pageLoading(false)),
    }
}


export default connect(mapStateToProps,mapDispathToProps)(About);