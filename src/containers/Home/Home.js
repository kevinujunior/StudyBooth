import React from 'react'
import Header from '../../components/Header/Header'
import classes from './Home.css'
import RightPanel from './RightPanel/RightPanel';

function Home() {
    return (
        <div className={classes.home}>
            {/* Header */}
            <Header />
            <h4>Home</h4>
            {/* Left Sidebar */}
            {/* Feed */}
            <RightPanel />
            {/* Footer */}
        </div>
    )
}

export default Home
