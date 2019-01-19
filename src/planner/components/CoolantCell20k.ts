import { ComponentBrand } from '../ComponentBrand';
import { Component } from '../Component';
import { action } from 'mobx';

export class CoolantCell20k extends Component {
  public brand = ComponentBrand.CoolantCell20k;

  public get maxHeat(): number {
    return 10000;
  }

  @action
  public tick(): void {}
}
