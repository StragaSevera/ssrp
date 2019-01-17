import { ComponentBrand } from '../ComponentBrand';
import { Component } from '../Component';

export class EmptyComponent extends Component {
  public brand = ComponentBrand.EmptyComponent;

  public tick(): void {}
}
