import * as React from 'react';
import './App.css';

import { Grid } from './components/Grid';

class App extends React.Component {
  public render() {
    return (
      <div className='App'>
        <Grid/>
      </div>
    );
  }
}

export default App;
