import * as React from 'react';
import { ReactorStore, ReactorStoreProps } from '../planner/ReactorStore';
import { inject, observer } from 'mobx-react';
import { Stores } from '../const/Stores';
import styles from './Info.module.scss';

@inject(Stores.store)
@observer
export class Info extends React.Component<ReactorStoreProps> {
  private store: ReactorStore;

  constructor(props: ReactorStoreProps) {
    super(props);
    this.store = props.store!;
  }

  public render() {
    return (
      <div className={styles.info}>
        <p>Current Heat: {this.store.reactor.currentHeat}.</p>
        <p>Current EU: {this.store.reactor.currentEU}.</p>
        <p>
          <input type='button' onClick={this.store.tick} value='Tick!' />
          <input type='button' onClick={this.store.recount} value='Reset' />
        </p>
      </div>
    );
  }
}
