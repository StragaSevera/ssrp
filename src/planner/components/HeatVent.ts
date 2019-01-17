import { ComponentBrand } from '../ComponentBrand';
import { Component } from '../Component';

export class HeatVent extends Component {
  public brand = ComponentBrand.HeatVent;

  public getMaxHeat(): number {
    return 1000;
  }

  public tick(): void {
    this.lowerNextHeat(6);
  }
}
