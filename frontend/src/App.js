
import './App.css';
import { BrowserRouter as Router,  Switch, Route} from 'react-router-dom';
import Home from './containers/Home/Home';
import Signup from './components/auth/Signup';
import LandingPage from './components/auth/LandingPage';
import Login from './components/auth/Login';
function App() {
  const user = null;
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <LandingPage /> : <Home />}
          </Route>
          <Route exact path="/signup" component ={Signup}/>
          <Route exact path="/login" component = {Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
