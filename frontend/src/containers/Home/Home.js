import React , {Component} from 'react'
import Header from '../../components/Home/Header/Header'
import classes from './Home.css'
import RightPanel from './RightSection/RightPanel'
import LeftPanel from './LeftPanel/LeftPanel';
import MainSection from './MainSection/MainSection';
import Chat from './Chat/Chat';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {connect } from 'react-redux';

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
        let ButtonIcon = <ChatBubbleIcon />;
        let homeClasses = [classes.Home];
        if(this.props.theme === 'dark'){
            homeClasses.push(classes.Dark);
        }
       
        return (
            <div className={homeClasses.join(" ")} >
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

const mapStateToProps = (state) => {
    return {
        theme: state.theme,
    }
}
export default connect(mapStateToProps)(Home)
