import { ComponentBrand } from '../../const/ComponentBrand';
import { HeatingCell } from './abstract/HeatingCell';
import { HeatingMaterial, Uranium } from './abstract/HeatingMaterials';

export class UraniumCellSingle extends HeatingCell {
  public brand = ComponentBrand.UraniumCellSingle;

  protected get arity(): number {
    return 1;
  }

  protected get material(): HeatingMaterial {
    return Uranium;
  }
}
