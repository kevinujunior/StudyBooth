
import './App.css';
import { BrowserRouter as Router,  Switch, Route} from 'react-router-dom';

import Signup from './components/auth/Signup';
import LandingPage from './components/auth/LandingPage';
import Login from './components/auth/Login';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component = {LandingPage}/>
          <Route exact path="/signup" component ={Signup}/>
          <Route exact path="/login" component = {Login} />
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
