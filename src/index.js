import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import combineallreducers from './reducers/combineallreducers';
import { HashRouter } from 'react-router-dom';

const store= createStore(combineallreducers)
console.log(store)
ReactDOM.render(
  <HashRouter>
  <Provider store={store}>
     <App />
  </Provider>
  </HashRouter>,
  document.getElementById('root')
);


