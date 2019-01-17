import { ComponentBrand } from '../ComponentBrand';
import { Component } from '../Component';

export class CoolantCell10k extends Component {
  public brand = ComponentBrand.CoolantCell20k;

  public getMaxHeat(): number {
    return 10000;
  }

  public tick(): void {}
}
