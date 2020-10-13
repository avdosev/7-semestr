import React from 'react';
import './App.css';
import {Floor} from "./Floor";
import {Grid} from "semantic-ui-react";
import Elevator from './Elevator';
import {floorsCount} from "./config/config";


function App() {
    const floors: React.ReactElement[] = []
    for (let i = floorsCount; i > 0; i--) {
        floors.push(<Floor key={i} floorNumber={i}/>)
    }
    return (
        <div className="App">
            {floors}
            {<Elevator/>}
        </div>
    );
}

export default App;
