import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from "./reducers"
//import logger from 'redux-logger'

const middleware = applyMiddleware( thunk/*, logger */)

const store = createStore(
  reducer,middleware
);
export default store;
