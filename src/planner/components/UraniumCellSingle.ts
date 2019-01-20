import { ComponentBrand } from '../../const/ComponentBrand';
import { UraniumCell } from './abstract/UraniumCell';

export class UraniumCellSingle extends UraniumCell {
  public brand = ComponentBrand.UraniumCellSingle;

  protected get arity(): number {
    return 1;
  }

  public get isReflector(): boolean {
    return true;
  }
}
