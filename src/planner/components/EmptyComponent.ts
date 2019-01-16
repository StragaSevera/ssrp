import { ComponentType } from '../ComponentType';
import { Component } from '../Component';

export class EmptyComponent extends Component {
  public type = ComponentType.EmptyComponent;

  public tick(): void {}
}
