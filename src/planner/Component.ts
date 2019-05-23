import { ComponentBrand } from '../const/ComponentBrand';
import { Reactor } from './Reactor';
import { ReactorComponent } from './components/ReactorComponent';
import { CoordsDict } from './Coords';
import { action, observable } from 'mobx';
import { ComponentError } from './Errors';

export abstract class Component {
  @observable
  public brand!: ComponentBrand;
  @observable
  public currentHeat: number = 0;
  @observable
  public nextHeat: number = 0;
  @observable.struct
  public coords: CoordsDict;

  private reactor: Reactor;
  protected reactorComponent: ReactorComponent;

  constructor(reactor: Reactor, x: number, y: number) {
    this.reactor = reactor;
    this.reactorComponent = reactor.reactorComponent;
    this.coords = { x, y };
  }

  protected get neighbours(): Component[] {
    return this.reactor.getNeighbours(this.coords.x, this.coords.y);
  }

  public get isHeatable(): boolean {
    return this.maxHeat !== 0;
  }

  public get maxHeat(): number {
    return 0;
  }

  @action
  public addNextHeat(heat: number): void {
    if (!this.isHeatable) {
      throw new ComponentError(`This component cannot be heated: ${this.brand.toString()}`);
    }
    this.nextHeat += heat;
  }

  @action
  public lowerNextHeat(heat: number): void {
    if (!this.isHeatable) {
      throw new ComponentError(`This component cannot be heated: ${this.brand.toString()}`);
    }
    this.nextHeat -= heat;
  }

  @action
  public refresh() {
    this.currentHeat = 0;
    this.nextHeat = 0;
  }

  public get heatRatio(): number {
    const maxHeat = this.maxHeat;
    return maxHeat === 0 ? 0 : this.currentHeat / maxHeat;
  }

  public get isReflector(): boolean {
    return false;
  }

  @action
  public finalizeTick(): void {
    this.currentHeat += this.nextHeat;
    this.nextHeat = 0;
    if (this.currentHeat < 0) this.currentHeat = 0;
  }

  public abstract tick(): void;

  @action
  public fullTick(): void {
    this.tick();
    this.finalizeTick();
  }
}
