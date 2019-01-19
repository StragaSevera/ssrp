import * as React from 'react';
import { ReactorStore } from '../planner/ReactorStore';
import { Provider } from 'mobx-react';

export class StoreComponent extends React.Component<{}> {
  private readonly store: ReactorStore;

  constructor(props: {}) {
    super(props);

    this.store = new ReactorStore();
  }

  public render() {
    return <Provider store={this.store}>{this.props.children}</Provider>;
  }
}
