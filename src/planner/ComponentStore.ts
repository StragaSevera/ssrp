import { EmptyComponent } from './components/EmptyComponent';
import { UraniumCellSingle } from './components/UraniumCellSingle';
import { HeatVent } from './components/HeatVent';
import { IComponent } from './IComponent';
import { ComponentType } from './ComponentType';

type IComponentStore = { [index in ComponentType]: new () => IComponent };
export const ComponentStore: IComponentStore = { EmptyComponent, UraniumCellSingle, HeatVent };
