import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import { createStore,compose,applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import themeReducer from './store/reducers/theme';
import authReducer from './store/reducers/auth';
import feedReducer from './store/reducers/feed';
import currentUserReducer from './store/reducers/currentUser';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  feed: feedReducer,
  currentUser: currentUserReducer,
})


const store = createStore(rootReducer, composeEnhances(
    applyMiddleware(thunk)
));


const app = (
  <Provider store={store}>{/* provider is needed to connect redux to react so react can use the store*/}
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);
