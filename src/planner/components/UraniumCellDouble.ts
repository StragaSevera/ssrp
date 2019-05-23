import { ComponentBrand } from '../../const/ComponentBrand';
import { HeatingCell } from './abstract/HeatingCell';
import { HeatingMaterial, Uranium } from './abstract/HeatingMaterials';

export class UraniumCellDouble extends HeatingCell {
  public brand = ComponentBrand.UraniumCellDouble;

  protected get arity(): number {
    return 2;
  }

  protected get material(): HeatingMaterial {
    return Uranium;
  }
}
