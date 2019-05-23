import { ComponentBrand } from '../../const/ComponentBrand';
import { HeatingCell } from './abstract/HeatingCell';
import { HeatingMaterial, Uranium } from './abstract/HeatingMaterials';

export class UraniumCellQuad extends HeatingCell {
  public brand = ComponentBrand.UraniumCellQuad;

  protected get arity(): number {
    return 4;
  }

  protected get material(): HeatingMaterial {
    return Uranium;
  }
}
