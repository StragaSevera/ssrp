import { EmptyComponent } from '../planner/components/EmptyComponent';
import { ComponentClass } from '../planner/ComponentClass';
import { ReactorComponent } from '../planner/components/ReactorComponent';
import { UraniumCellSingle } from '../planner/components/UraniumCellSingle';
import { CoolantCell20k } from '../planner/components/CoolantCell20k';
import { HeatVent } from '../planner/components/HeatVent';
import { UraniumCellDouble } from '../planner/components/UraniumCellDouble';
import { UraniumCellQuad } from '../planner/components/UraniumCellQuad';

export enum ComponentBrand {
  EmptyComponent = 'EmptyComponent',
  ReactorComponent = 'ReactorComponent',
  UraniumCellSingle = 'UraniumCellSingle',
  UraniumCellDouble = 'UraniumCellDouble',
  UraniumCellQuad = 'UraniumCellQuad',
  HeatVent = 'HeatVent',
  CoolantCell20k = 'CoolantCell20k'
}

// It is not pretty, but Typescript is bad with handling class types
type TComponentDict = { [key in ComponentBrand]: ComponentClass };

export const ComponentDict: TComponentDict = {
  [ComponentBrand.EmptyComponent]: EmptyComponent,
  [ComponentBrand.ReactorComponent]: ReactorComponent,
  [ComponentBrand.UraniumCellSingle]: UraniumCellSingle,
  [ComponentBrand.UraniumCellDouble]: UraniumCellDouble,
  [ComponentBrand.UraniumCellQuad]: UraniumCellQuad,
  [ComponentBrand.HeatVent]: HeatVent,
  [ComponentBrand.CoolantCell20k]: CoolantCell20k
};

export const ComponentListFiltered: ComponentBrand[] = (Object.keys(
  ComponentDict
) as ComponentBrand[]).filter(brand => brand !== ComponentBrand.ReactorComponent);
