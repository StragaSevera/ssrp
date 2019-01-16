import { ComponentType } from './ComponentType';
import { Reactor } from './Reactor';
import { Coords } from './Coords';

export abstract class Component {
  public type: ComponentType;
  public currentHeat: number = 0;
  public nextHeat: number = 0;
  public coords: Coords;

  private reactor: Reactor;

  constructor(reactor: Reactor, x: number, y: number) {
    this.reactor = reactor;
    this.coords = { x, y };
  }

  private getNeighbours(): Component[] {
    return this.reactor.getNeighbours(this.coords);
  }

  public abstract tick: () => void;
}
