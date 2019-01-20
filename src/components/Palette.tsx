import * as React from 'react';
import styles from './TableGrid.module.scss';
import { inject } from 'mobx-react';
import { Stores } from '../const/Stores';
import { ReactorStore, ReactorStoreProps } from '../planner/ReactorStore';
import { ImageComponent, ImageSelection } from './ImageComponent';
import { ComponentBrand, ComponentListFiltered } from '../const/ComponentBrand';

interface State {
  selectedX: number;
  selectedY: number;
}

function matrixify<T>(source: T[], count: number): T[][] {
  const result: T[][] = [];
  let row: T[] = [];
  for (let i = 0; i < source.length; i++) {
    row.push(source[i]);
    if (i % count === count - 1) {
      result.push(row);
      row = [];
    }
  }
  if (row.length !== 0) result.push(row);
  return result;
}

@inject(Stores.store)
export class Palette extends React.Component<ReactorStoreProps, State> {
  private store: ReactorStore;
  private readonly brandGrid: ComponentBrand[][];
  private readonly rowSize: number = 4;

  constructor(props: ReactorStoreProps) {
    super(props);
    this.store = props.store!;
    this.brandGrid = matrixify<ComponentBrand>(ComponentListFiltered, this.rowSize);
    this.state = { selectedX: 0, selectedY: 0 };
  }

  private pickComponent = (x: number, y: number) => {
    return () => {
      this.store.selectedComponent = this.brandGrid[y][x];
      this.setState({ selectedX: x, selectedY: y });
    };
  };

  private isSelected = (x: number, y: number) => {
    return this.state.selectedX === x && this.state.selectedY === y;
  };

  public render() {
    return (
      <table className={styles.table_grid}>
        <tbody>
          {this.brandGrid.map((row, y) => (
            <tr key={y}>
              {row.map((col, x) => (
                <td key={x} onClick={this.pickComponent(x, y)}>
                  <ImageComponent brand={col} selected={this.isSelected(x, y) ? ImageSelection.high : undefined} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
