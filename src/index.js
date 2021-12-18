import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router } from 'react-router-dom';


const app = (
  <Provider store={store}>{/* provider is needed to connect redux to react so react can use the store*/}
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);
