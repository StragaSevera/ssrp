import { EmptyComponent } from './components/EmptyComponent';
import { IComponent } from './IComponent';
import { ComponentType } from './ComponentType';
import { ComponentStore } from './ComponentStore';

export class Reactor {
  public readonly gridRows = 6;
  public readonly defaultGridCols = 3;
  public gridCols: number;
  private grid: IComponent[][] = [];

  constructor(chambers: number = 6) {
    this.gridCols = this.defaultGridCols + chambers;
    for (let i = 0; i < this.gridRows; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.gridCols; j++) {
        this.grid[i][j] = new EmptyComponent();
      }
    }
  }

  public getComponent(x: number, y: number): IComponent {
    if (x <= 0 || x > this.gridCols || y <= 0 || y > this.gridRows) {
      throw new Error(`Wrong coords: ${x}, ${y}`);
    }
    return this.grid[y - 1][x - 1];
  }

  private setComponent(x: number, y: number, component: IComponent): void {
    if (x <= 0 || x > this.gridCols || y <= 0 || y > this.gridRows) {
      throw new Error(`Wrong coords: ${x}, ${y}`);
    }
    this.grid[y - 1][x - 1] = component;
  }

  public getComponentType(x: number, y: number): ComponentType {
    return this.getComponent(x, y).type;
  }

  public setComponentType(x: number, y: number, type: ComponentType): void {
    this.setComponent(x, y, new ComponentStore[type]());
  }
}
