import { ComponentType } from '../ComponentType';
import { Component } from '../Component';

export class ReactorComponent extends Component {
  public type = ComponentType.ReactorComponent;
  public currentEU: number = 0;
  public nextEU: number = 0;

  public tick(): void {}

  protected getNeighbours(): never {
    throw new Error('There cannot be neigbours for a reactor component!');
  }

  public addNextEU(eu: number): void {
    this.nextEU += eu;
  }
}
