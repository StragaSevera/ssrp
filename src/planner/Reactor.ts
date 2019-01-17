import { EmptyComponent } from './components/EmptyComponent';
import { Component } from './Component';
import { ComponentBrand } from './ComponentBrand';
import { ComponentClass } from './ComponentClass';
import { CoordsDict } from './Coords';
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

  public getComponentType(x: number, y: number): ComponentBrand {
    if (this.isWrongCoords(x, y)) {
      throw new Error(`Wrong coords: ${x}, ${y}`);
    }
    return this.getComponent(x, y).brand;
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

  public getNeighbourCoords(x: number, y: number): CoordsDict[] {
    const result = [{ x, y: y + 1 }, { x, y: y - 1 }, { x: x + 1, y }, { x: x - 1, y }];
    return result.filter(c => !this.isWrongCoords(c.x, c.y));
  }

  public getNeighbours(x: number, y: number): Component[] {
    const neighbourCoords = this.getNeighbourCoords(x, y);
    return neighbourCoords
      .map(c => this.getComponent(c.x, c.y))
      .filter(comp => comp.brand !== ComponentBrand.EmptyComponent);
  }

  private getComponents() {
    const result: Component[] = [];
    for (const row of this.grid) {
      for (const component of row) {
        if (component.brand !== ComponentBrand.EmptyComponent) {
          result.push(component);
        }
      }
    }
    return result;
  }

  public tick() {
    const components = this.getComponents();
    components.forEach(c => c.tick());
    components.forEach(c => c.finalizeTick());
    this.reactorComponent.finalizeTick();
  }

  public get currentEU() {
    return this.reactorComponent.currentEU;
  }

  public get nextEU() {
    return this.reactorComponent.nextEU;
  }

  public get currentHeat() {
    return this.reactorComponent.currentHeat;
  }

  public get nextHeat() {
    return this.reactorComponent.nextHeat;
  }
}
