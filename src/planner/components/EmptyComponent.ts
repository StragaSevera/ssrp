import { ComponentBrand } from '../../const/ComponentBrand';
import { Component } from '../Component';
import { action } from 'mobx';

export class EmptyComponent extends Component {
  public brand = ComponentBrand.EmptyComponent;

  @action
  public tick(): void {}
}
