import React from 'react';
import './App.css';
import { ATM } from './Components/ATM/ATM';
import { Container, Grid, GridColumn } from "semantic-ui-react";

function App() {
  return (
    <div className="App">

      <Grid>
        {[1,2].map((id) => (
          <GridColumn key={id} width={4}>
            <ATM />
          </GridColumn>
        ))}
      </Grid>

    </div>
  );
}

export default App;
