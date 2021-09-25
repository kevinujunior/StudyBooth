import React from 'react'
import Header from '../../components/Header/Header'
import classes from './Home.css'
import RightPanel from './RightPanel/RightPanel'

function Home() {
    return (
        <div className={classes.home}>
            {/* Header */}
            <Header />
            <div className={classes.main}>
                <RightPanel />
                <RightPanel />
            </div>
            {/* Feed */}
            {/* Right Sidebar */}
            {/* Footer */}
        </div>
    )
}

export default Home
