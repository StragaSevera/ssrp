import { Component } from './Component';

export type ComponentClass = new (...params: any) => Component;
