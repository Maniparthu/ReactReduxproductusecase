import React from 'react';

import './App.css';

import Content from './content';
import Header from './header'
import ProductDetails from './containers/productdetails'

function App() {
  return (
    <div >
      <Header/>
      
      <br></br>
      <Content/>
        <ProductDetails/>
    
      </div>
  );
}

export default App;
