import React from 'react'
import Header from '../../components/Header/Header'
import classes from './Home.css'
import RightPanel from './RightSection/RightPanel'
import LeftSection from './LeftSection/LeftSection';
import MainSection from './MainSection/MainSection';
function Home() {
    return (
        <div className={classes.home}>
            {/* Header */}
            <Header />
            <div className={classes.main}>
                <LeftSection/>
                <MainSection />
                <RightPanel />
            </div>
            {/* <h4>Home</h4> */}
            {/* Left Sidebar */}
            {/* Feed */}
            {/* Right Sidebar */}
            {/* Footer */}
        </div>
    )
}

export default Home
