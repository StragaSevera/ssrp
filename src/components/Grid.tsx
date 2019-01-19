import * as React from 'react';
import styles from './TableGrid.module.scss';
import { inject, observer } from 'mobx-react';
import { Stores } from '../const/Stores';
import { ReactorStore, ReactorStoreProps } from '../planner/ReactorStore';
import { ImageComponent } from './ImageComponent';

@inject(Stores.store)
@observer
export class Grid extends React.Component<ReactorStoreProps> {
  private store: ReactorStore;

  constructor(props: ReactorStoreProps) {
    super(props);
    this.store = props.store!;
  }

  private changeCell = (x: number, y: number) => {
    return () => {
      this.store.reactor.setComponentClass(x, y, this.store.selectedComponent);
      this.store.recount();
    };
  };

  public render() {
    return (
      <table className={styles.table_grid}>
        <tbody>
          {this.store.reactor.grid.map((row, y) => (
            <tr key={y + 1}>
              {row.map((col, x) => (
                <td key={x + 1} onClick={this.changeCell(x + 1, y + 1)}>
                  <ImageComponent brand={col.brand} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
