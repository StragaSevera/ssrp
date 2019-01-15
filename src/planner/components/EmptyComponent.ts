import { ComponentType } from '../ComponentType';
import { IComponent } from '../IComponent';

export class EmptyComponent implements IComponent {
  public type = ComponentType.EmptyComponent;
}
