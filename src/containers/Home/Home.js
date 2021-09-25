import React from 'react'
import Header from '../../components/Header/Header'
import './Home.css'
import'./LeftSection/LeftSection'
import LeftSection from './LeftSection/LeftSection'


function Home() {
    return (
        <div className="home">
            {/* Header */}
            <Header />
            {/* <h4>Home</h4> */}
            {/* Left Sidebar */}
            <LeftSection/>
            {/* Feed */}
            {/* Right Sidebar */}
            {/* Footer */}
        </div>
    )
}

export default Home
