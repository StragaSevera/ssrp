import * as React from 'react';
import { Grid } from './Grid';
import { Info } from './Info';

export class MainArea extends React.Component {
  public render() {
    return (
      <div>
        <Grid/>
        <Info/>
      </div>
    );
  }
}
