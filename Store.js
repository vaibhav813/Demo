import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './Reducer';

const cstore = (initialState) => {
  const middleware = applyMiddleware(thunk);

  return createStore(reducer, initialState, middleware);
};

export default cstore;
