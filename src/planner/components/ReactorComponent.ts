import { ComponentBrand } from '../ComponentBrand';
import { Component } from '../Component';

export class ReactorComponent extends Component {
  public brand = ComponentBrand.ReactorComponent;
  public currentEU: number = 0;
  public nextEU: number = 0;

  public tick(): void {}

  protected getNeighbours(): never {
    throw new Error('There cannot be neigbours for a reactor component!');
  }

  public addNextEU(eu: number): void {
    this.nextEU += eu;
  }

  public finalizeTick(): void {
    super.finalizeTick();
    this.currentEU += this.nextEU;
    this.nextEU = 0;
  }
}
