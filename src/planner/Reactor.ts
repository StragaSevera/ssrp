import { EmptyComponent } from './components/EmptyComponent';
import { Component } from './Component';
import { ComponentType } from './ComponentType';
import { ComponentClass } from './ComponentClass';
import { Coords } from './Coords';
import { ReactorComponent } from './components/ReactorComponent';

export class Reactor {
  public readonly gridRows = 6;
  public readonly defaultGridCols = 3;
  public gridCols: number;
  public reactorComponent: ReactorComponent;
  private grid: Component[][] = [];

  constructor(chambers: number = 6) {
    this.reactorComponent = new ReactorComponent(this, -1, -1);
    this.gridCols = this.defaultGridCols + chambers;
    for (let y = 0; y < this.gridRows; y++) {
      this.grid[y] = [];
      for (let x = 0; x < this.gridCols; x++) {
        this.grid[y][x] = new EmptyComponent(this, x, y);
      }
    }
  }

  public getComponent(x: number, y: number): Component {
    if (this.isWrongCoords(x, y)) {
      throw new Error(`Wrong coords: ${x}, ${y}`);
    }
    return this.grid[y - 1][x - 1];
  }

  private setComponent(x: number, y: number, component: Component): Component {
    if (this.isWrongCoords(x, y)) {
      throw new Error(`Wrong coords: ${x}, ${y}`);
    }
    this.grid[y - 1][x - 1] = component;
    return component;
  }

  private isWrongCoords(x: number, y: number) {
    return x <= 0 || x > this.gridCols || y <= 0 || y > this.gridRows;
  }

  public getComponentType(x: number, y: number): ComponentType {
    if (this.isWrongCoords(x, y)) {
      throw new Error(`Wrong coords: ${x}, ${y}`);
    }
    return this.getComponent(x, y).type;
  }

  public setComponentClass(x: number, y: number, type: ComponentClass): Component {
    if (this.isWrongCoords(x, y)) {
      throw new Error(`Wrong coords: ${x}, ${y}`);
    }
    if (type === ReactorComponent) {
      throw new Error('You cannot add reactor component to grid');
    }
    return this.setComponent(x, y, new type(this, x, y));
  }

  public getNeighbourCoords(coords: Coords): Coords[];
  public getNeighbourCoords(x: number, y: number): Coords[];
  public getNeighbourCoords(a: number | Coords, b?: number): Coords[];
  public getNeighbourCoords(a: number | Coords, b?: number): Coords[] {
    let x: number;
    let y: number;
    if (typeof a === 'object') {
      ({ x, y } = a as Coords);
    } else {
      x = a;
      y = b as number;
    }
    const result = [{ x, y: y + 1 }, { x, y: y - 1 }, { x: x + 1, y }, { x: x - 1, y }];
    return result.filter(c => !this.isWrongCoords(c.x, c.y));
  }

  public getNeighbours(coords: Coords): Component[];
  public getNeighbours(x: number, y: number): Component[];
  public getNeighbours(a: number | Coords, b?: number): Component[] {
    const neighbourCoords = this.getNeighbourCoords(a, b);
    return neighbourCoords
      .map(c => this.getComponent(c.x, c.y))
      .filter(comp => comp.type !== ComponentType.EmptyComponent);
  }
}
