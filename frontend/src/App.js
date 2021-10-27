
import './App.css';
import React, {Component } from 'react';
import { BrowserRouter as Router,  Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './containers/Home/Home';
import Signup from './components/auth/Signup';
import LandingPage from './components/auth/LandingPage';
import Login from './components/auth/Login';
import * as actions from './store/actions/auth';
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  
  render(){
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/" component={ this.props.isAuthenticated ? Home : LandingPage}/>
            {/* <Home /> */}
            <Route exact path="/signup" component ={Signup}/>
            <Route exact path="/login" component = {Login} />
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
