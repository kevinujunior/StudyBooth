import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './Store/reducer'

const store =  createStore(reducer); //we have created a store and now we pass that into provider

ReactDOM.render(
  <Provider store = {store}> {/* provider is needed to connect redux to react so react can use the store*/}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
