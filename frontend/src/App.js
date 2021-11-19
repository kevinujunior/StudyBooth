
import classes from './App.css';
import React, {Component } from 'react';
import { BrowserRouter as Router,  Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './containers/Home/Home';
import Signup from './components/auth/Signup';
import LandingPage from './components/auth/LandingPage';
import Login from './components/auth/Login';
import Profile from './containers/Profile/Profile';
import * as actions from './store/actions/index';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  
  render(){
    return (
      <div className={classes.app}>
        <Router>
          <Switch>
            <Route exact path="/home"> 
              {this.props.isAuthenticated ? <Home /> : <Redirect to="/login" /> }
            </Route>
            <Route exact path="/signup" component ={Signup}/> 
            <Route exact path="/login" component = { Login}/>
            <Route exact path="/profile" >
              {this.props.isAuthenticated ? <Profile /> : <Redirect to="/login" />}
            </Route>
            <Route exact path='/' >
              {this.props.isAuthenticated ? <Redirect to="/home" /> : <LandingPage />}
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()) 
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
