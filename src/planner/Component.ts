import { ComponentType } from './ComponentType';
import { Reactor } from './Reactor';
import { ReactorComponent } from './components/ReactorComponent';
import { CoordsDict } from './Coords';

export abstract class Component {
  public type: ComponentType;
  public currentHeat: number = 0;
  public nextHeat: number = 0;
  public coords: CoordsDict;

  private reactor: Reactor;
  protected reactorComponent: ReactorComponent;

  constructor(reactor: Reactor, x: number, y: number) {
    this.reactor = reactor;
    this.reactorComponent = reactor.reactorComponent;
    this.coords = { x, y };
  }

  protected getNeighbours(): Component[] {
    return this.reactor.getNeighbours(this.coords.x, this.coords.y);
  }

  public addNextHeat(heat: number): void {
    if (!this.isHeatable()) {
      throw new Error(`This component cannot be heated: ${this.type.toString()}`);
    }
    this.nextHeat += heat;
  }

  public isHeatable(): boolean {
    return true;
  }

  public isReflector(): boolean {
    return false;
  }

  public abstract tick(): void;
}
