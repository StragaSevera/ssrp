import { ComponentBrand } from '../../const/ComponentBrand';
import { Component } from '../Component';
import { action } from 'mobx';

export class HeatVent extends Component {
  public brand = ComponentBrand.HeatVent;

  public get maxHeat(): number {
    return 1000;
  }

  @action
  public tick(): void {
    this.lowerNextHeat(6);
  }
}
