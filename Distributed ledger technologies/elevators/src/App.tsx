import React from 'react';
import './App.css';
import {Floor} from "./Floor";
import {Grid} from "semantic-ui-react";

const floors: React.ReactElement[] = []
for(let i=0; i<7; i++) {
  floors.push(<Floor/>)
}


function App() {
  return (
    <div className="App">
        {floors}

    </div>
  );
}

export default App;
