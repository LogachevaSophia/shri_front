import React from 'react';
import './App.css';
import Header from '../widget/Header/Header';
import Router from './Router';

function App() {
  return (
    <>
      <Header />
      <div style={{marginTop: "calc( 88px + 16px)", marginBottom: "16px"}}>
        <Router />
      </div>

    </>
  );
}

export default App;
