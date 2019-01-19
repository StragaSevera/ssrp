import * as React from 'react';
import style from './App.module.css';

import { Palette } from './components/Palette';
import { MainArea } from './components/MainArea';

export class App extends React.Component {
  public render() {
    return (
      <div className={style.app}>
        <MainArea/>
        <Palette/>
      </div>
    );
  }
}
