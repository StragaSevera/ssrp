import { ComponentBrand } from '../../const/ComponentBrand';
import { Component } from '../Component';
import { action, observable } from 'mobx';

export class ReactorComponent extends Component {
  public brand = ComponentBrand.ReactorComponent;
  @observable
  public currentEU: number = 0;
  @observable
  public nextEU: number = 0;

  @action
  public tick(): void {}

  protected get neighbours(): never {
    throw new Error('There cannot be neigbours for a reactor component!');
  }

  public get maxHeat(): number {
    return 8500;
  }

  @action
  public addNextEU(eu: number): void {
    this.nextEU += eu;
  }

  @action
  public finalizeTick(): void {
    super.finalizeTick();
    this.currentEU += this.nextEU;
    this.nextEU = 0;
  }

  @action
  public refresh() {
    super.refresh();
    this.nextEU = 0;
    this.currentEU = 0;
  }
}
