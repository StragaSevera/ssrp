import { EmptyComponent } from './components/EmptyComponent';
import { UraniumCellSingle } from './components/UraniumCellSingle';
import { HeatVent } from './components/HeatVent';
import { Component } from './Component';
import { ComponentType } from './ComponentType';
import { Reactor } from './Reactor';

type IComponentStore = { [index in ComponentType]: new (reactor: Reactor, x: number, y: number) => Component };
export const ComponentStore: IComponentStore = { EmptyComponent, UraniumCellSingle, HeatVent };
