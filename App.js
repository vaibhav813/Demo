import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import cstore from './Store';
import Home from './Home';
// const store = configureStore({});
const istore = cstore({});
const app = () => (
  <Provider store={istore}>
    <Home />
  </Provider>
);

export default app;
