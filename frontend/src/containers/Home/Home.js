import React , {Component} from 'react'
import Header from '../../components/Home/Header/Header'
import classes from './Home.css'
import RightPanel from './RightSection/RightPanel'
import LeftPanel from './LeftPanel/LeftPanel';
import MainSection from './MainSection/MainSection';

class Home extends Component {

    state = {
        mainVisible : "Feed",
    }
    
    changeMainsComponent= (component) => {
        this.setState({
            mainVisible: component,
        })
    }

    render(){
  
        return (
            <div className={classes.Home}>
                {/* Header */}
                <Header />
                <div className={classes.main}>
                    <LeftPanel changeMain = {this.changeMainsComponent}/> {/* Home visiblity will be controlled from dashboard of left panel*/}
                    <MainSection show={this.state.mainVisible} /> {/* from home we will control what should be visible in Main */}
                    <RightPanel />
                </div>
            </div>
        )
    }
}

export default Home
