import React, {Component } from 'react';
import { BrowserRouter as Router,  Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './containers/Home/Home';
import Signup from './components/auth/Signup';
import LandingPage from './components/auth/LandingPage';
import Login from './components/auth/Login';
import Profile from './containers/Profile/Profile';
import LoadingPage from './components/UI/LoadingPage/LoadingPage';
import Layout from './HOC/Layout/Layout';
import * as actions from './store/actions/index';
import axios from 'axios';
import WebSocketInstance from './websocket';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
    WebSocketInstance.connect();
  }

  loadEssential = () => {
    console.log("loading essential")
    this.props.onFetchFeed(1);
    this.props.onFetchCurrentUserDetail();
  }
  
  render(){

    
    return (
        <Switch>
          <Route exact path="/home"> 
            {this.props.isAuthenticated ? this.props.isHomeLoading ? <LoadingPage /> : <Layout>
              <Home />
            </Layout> : <Redirect to="/login" /> }
          </Route>
          <Route exact path="/layout" component ={Layout}/> 
          <Route exact path="/signup" component ={Signup}/> 
          <Route exact path="/loading" component ={LoadingPage} />
          <Route exact path="/login"> 
            {this.props.isAuthenticated ? <Redirect to="/home" /> :<Login />  }
          </Route>
          <Route exact path="/profile" >
            {this.props.isAuthenticated ? this.props.isProfileLoading ? <LoadingPage /> : <Layout> <Profile /> </Layout> : <Redirect to="/login" />}
          </Route>
          <Route exact path='/' >
            {this.props.isAuthenticated ? <Redirect to="/home" /> : <LandingPage />}
          </Route>
        </Switch>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null,
    isHomeLoading: state.feed.isHomeLoading,
    isProfileLoading: state.profile.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    onFetchCurrentUserDetail: () => dispatch(actions.fetchCurrentUser()),
    onFetchFeed: (pageNo) => dispatch(actions.fetchFeed(pageNo)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
