import { EmptyComponent } from './components/EmptyComponent';
import { ComponentClass } from './ComponentClass';
import { ReactorComponent } from './components/ReactorComponent';
import { UraniumCellSingle } from './components/UraniumCellSingle';
import { CoolantCell20k } from './components/CoolantCell20k';
import { HeatVent } from './components/HeatVent';

export enum ComponentBrand {
  EmptyComponent = 'EmptyComponent',
  ReactorComponent = 'ReactorComponent',
  UraniumCellSingle = 'UraniumCellSingle',
  HeatVent = 'HeatVent',
  CoolantCell20k = 'CoolantCell20k'
}

type TComponentDict = { [key in ComponentBrand]: ComponentClass };

export const ComponentDict: TComponentDict = {
  [ComponentBrand.EmptyComponent]: EmptyComponent,
  [ComponentBrand.ReactorComponent]: ReactorComponent,
  [ComponentBrand.UraniumCellSingle]: UraniumCellSingle,
  [ComponentBrand.HeatVent]: HeatVent,
  [ComponentBrand.CoolantCell20k]: CoolantCell20k
};

export const ComponentListFiltered: ComponentBrand[] = (Object.keys(
  ComponentDict
) as ComponentBrand[]).filter(brand => brand !== ComponentBrand.ReactorComponent);
