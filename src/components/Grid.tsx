import * as React from 'react';
import styles from './Grid.module.scss';
import { inject, observer } from 'mobx-react';
import { Stores } from '../const/Stores';
import { ReactorStore } from '../planner/ReactorStore';
import { UraniumCellSingle } from '../planner/components/UraniumCellSingle';
import { ImageComponent } from './ImageComponent';

@inject(Stores.store)
@observer
export class Grid extends React.Component<{ store?: ReactorStore }> {
  private changeCell = (x: number, y: number) => {
    return () => {
      const reactor = this.props.store!.reactor;
      reactor.setComponentClass(x, y, UraniumCellSingle);
    };
  };

  public render() {
    const reactor = this.props.store!.reactor;
    return (
      <table className={styles.grid}>
        <tbody>
          {reactor.grid.map((row, y) => (
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
