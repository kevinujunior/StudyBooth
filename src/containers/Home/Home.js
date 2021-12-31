import React , {Component} from 'react'
import classes from './Home.css';
import RightPanel from './RightSection/RightPanel';
import LeftPanel from './LeftPanel/LeftPanel';
import MainSection from './MainSection/MainSection';

import {connect } from 'react-redux';
import * as actions from '../../store/actions/index'

class Home extends Component {

    state = {
        feedCurrPageNo: null, //
    }


    render(){
        
        let homeClasses = [classes.Home];
        if(this.props.theme === 'dark'){
            homeClasses.push(classes.Dark);
        }
        return (
            <div className={homeClasses.join(" ")} onScroll ={(e) => {
                    //here we are checking the scroll of home page and if scroll reaches to end we are calling fetchFeed for next page.
                    if(Math.round(e.target.scrollHeight -  e.target.scrollTop) <= e.target.offsetHeight + 400){
                        if(this.props.nextPageNo == this.state.feedCurrPageNo) return; //if we are calling for same page again return;
                        this.props.onFetchFeed(this.props.nextPageNo, this.props.loading)
                        this.setState({
                            feedCurrPageNo: this.props.nextPageNo,
                        })
                    }
                }}>
                    <div className={classes.main}>
                        <LeftPanel /> 
                        <MainSection /> 
                        {/* <ChatIn /> */}
                        <RightPanel />
                    </div>
                    
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.theme,
        nextPageNo: state.feed.nextPageNo,
        loading: state.feed.isFeedLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchFeed: (pageNo) => dispatch(actions.fetchFeed(pageNo)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
