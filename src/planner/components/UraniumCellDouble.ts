import { ComponentBrand } from '../../const/ComponentBrand';
import { UraniumCell } from './abstract/UraniumCell';

export class UraniumCellDouble extends UraniumCell {
  public brand = ComponentBrand.UraniumCellDouble;

  protected get arity(): number {
    return 2;
  }

  public get isReflector(): boolean {
    return true;
  }
}
