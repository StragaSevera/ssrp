import { EmptyComponent } from './components/EmptyComponent';
import { Component } from './Component';
import { ComponentBrand, ComponentDict } from '../const/ComponentBrand';
import { ComponentClass } from './ComponentClass';
import { CoordsDict } from './Coords';
import { ReactorComponent } from './components/ReactorComponent';
import { action, observable, runInAction } from 'mobx';
import { ComponentTypeError, CoordsError } from './Errors';

export class Reactor {
  public readonly gridRows = 6;
  public readonly defaultGridCols = 3;
  public gridCols!: number;
  @observable
  public reactorComponent!: ReactorComponent;
  @observable
  public grid: Component[][] = [];

  constructor(chambers: number = 6) {
    runInAction(() => {
      this.reactorComponent = new ReactorComponent(this, -1, -1);
      this.gridCols = this.defaultGridCols + chambers;
      for (let y = 0; y < this.gridRows; y++) {
        this.grid[y] = [];
        for (let x = 0; x < this.gridCols; x++) {
          this.grid[y][x] = new EmptyComponent(this, x, y);
        }
      }
    });
  }

  public getComponent(x: number, y: number): Component {
    this.ensureGoodCoords(x, y);
    return this.grid[y - 1][x - 1];
  }

  @action
  private setComponent(x: number, y: number, component: Component): Component {
    this.ensureGoodCoords(x, y);
    this.grid[y - 1][x - 1] = component;
    return component;
  }

  public getComponentType(x: number, y: number): ComponentBrand {
    this.ensureGoodCoords(x, y);
    return this.getComponent(x, y).brand;
  }

  @action
  public setComponentClass(x: number, y: number, type: ComponentClass | ComponentBrand): Component {
    this.ensureGoodCoords(x, y);
    let component: Component;
    if (typeof type === 'string') {
      if (type === ComponentBrand.ReactorComponent) {
        throw new ComponentTypeError('You cannot add reactor component to grid');
      }
      component = new ComponentDict[type](this, x, y);
    } else {
      // Hacky, but simple comparing type does not work
      component = new type(this, x, y);
      if (component.brand === ComponentBrand.ReactorComponent) {
        throw new ComponentTypeError('You cannot add reactor component to grid');
      }
    }

    return this.setComponent(x, y, component);
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

  private isWrongCoords(x: number, y: number) {
    return x <= 0 || x > this.gridCols || y <= 0 || y > this.gridRows;
  }

  private ensureGoodCoords(x: number, y: number) {
    if (this.isWrongCoords(x, y)) {
      throw new CoordsError(`Wrong coords: ${x}, ${y}`);
    }
  }

  private get components(): Component[] {
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

  @action
  public tick(): void {
    const components = this.components;
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

  @action
  public refresh() {
    this.components.forEach(c => c.refresh());
    this.reactorComponent.refresh();
  }
}
