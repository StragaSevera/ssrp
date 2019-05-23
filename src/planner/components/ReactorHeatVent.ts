import { ComponentBrand } from '../../const/ComponentBrand';
import { Component } from '../Component';
import { action } from 'mobx';

export class ReactorHeatVent extends Component {
  public brand = ComponentBrand.ReactorHeatVent;

  public get maxHeat(): number {
    return 1000;
  }

  @action
  public tick(): void {
    this.reactorComponent.lowerNextHeat(5);
    this.lowerNextHeat(5);
  }
}
