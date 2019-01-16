import { ComponentType } from '../ComponentType';
import { Component } from '../Component';

export class HeatVent extends Component {
  public type = ComponentType.HeatVent;
  public tick: () => void;
}
