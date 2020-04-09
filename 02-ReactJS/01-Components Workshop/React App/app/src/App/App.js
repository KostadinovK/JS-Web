import React from 'react';
import './App.css';

import Navigation from '../Navigation/Navigation';
import Aside from '../Aside/Aside';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navigation />
      <div className="Container">
        <Aside/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
