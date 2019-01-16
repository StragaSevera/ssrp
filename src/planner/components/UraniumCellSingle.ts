import { ComponentType } from '../ComponentType';
import { Component } from '../Component';

export class UraniumCellSingle extends Component {
  public type = ComponentType.UraniumCellSingle;
  public tick: () => void;
}
