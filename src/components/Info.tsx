import * as React from 'react';
import { ReactorStoreProps } from '../planner/ReactorStore';
import { inject, observer } from 'mobx-react';
import { Stores } from '../const/Stores';

const info: React.FunctionComponent<ReactorStoreProps> = ({ store }) => {
  store = store!;
  return (
    <div>
      <p>Current Heat: {store.reactor.currentHeat}.</p>
      <p>Current EU: {store.reactor.currentEU}.</p>
      <p>
        <input type='button' onClick={store.tick} value='Tick!'/>
      </p>
    </div>
  );
};

export const Info = inject(Stores.store)(observer(info));
