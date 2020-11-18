import React from 'react';
import './App.css';
import { ATM } from './Components/ATM/ATM';
import {Container} from "semantic-ui-react";

function App() {
  return (
    <div className="App">

            <ATM />
        <ATM />
    </div>
  );
}

export default App;
