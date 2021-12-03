import { createStore,compose,applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import themeReducer from './reducers/theme';
import authReducer from './reducers/auth';
import feedReducer from './reducers/feed';
import currentUserReducer from './reducers/currentUser';
import profileReducer from './reducers/profile';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  feed: feedReducer,
  currentUser: currentUserReducer,
  profile: profileReducer,
})


const store = createStore(rootReducer, composeEnhances(
    applyMiddleware(thunk)
));

export default store;