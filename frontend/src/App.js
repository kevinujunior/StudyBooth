
import classes from './App.css';
import React, {Component } from 'react';
import { BrowserRouter as Router,  Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './containers/Home/Home';
import Signup from './components/auth/Signup';
import LandingPage from './components/auth/LandingPage';
import Login from './components/auth/Login';
import Profile from './containers/Profile/Profile';
import * as actions from './store/actions/index';
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  
  render(){
    return (
      <div className={classes.app}>
        <Router>
          <Switch>
            <Route exact path="/home" component={ this.props.isAuthenticated ? Home : Login}/>
            <Route exact path="/signup" component ={Signup}/> 
            <Route exact path="/login" component = { Login}/>
            <Route exact path="/profile" component = { this.props.isAuthenticated ? Profile : Login} />
            <Route exact path='/' component={LandingPage} />
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
