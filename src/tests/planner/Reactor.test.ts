import { Reactor } from '../../planner/Reactor';
import { ComponentBrand } from '../../const/ComponentBrand';
import { UraniumCellSingle } from '../../planner/components/UraniumCellSingle';
import { ReactorComponent } from '../../planner/components/ReactorComponent';
import { ComponentTypeError, CoordsError } from '../../planner/Errors';

describe('Reactor', () => {
  let reactor: Reactor;
  beforeEach(() => {
    reactor = new Reactor();
  });

  it('has zero heat', () => {
    expect(reactor.reactorComponent.currentHeat).toBe(0);
    expect(reactor.reactorComponent.nextHeat).toBe(0);
  });

  it('has default grid 9x6', () => {
    for (let x = 1; x <= 9; x++) {
      for (let y = 1; y <= 6; y++) {
        expect(reactor.getComponent(x, y)).toBeTruthy();
      }
    }
    expect(() => reactor.getComponent(0, 1)).toThrowError(CoordsError);
    expect(() => reactor.getComponent(1, 0)).toThrowError(CoordsError);
    expect(() => reactor.getComponent(10, 4)).toThrowError(CoordsError);
    expect(() => reactor.getComponent(4, 7)).toThrowError(CoordsError);
  });

  it('has changable grid (3x6)', () => {
    reactor = new Reactor(0);
    for (let x = 1; x <= 3; x++) {
      for (let y = 1; y <= 6; y++) {
        expect(reactor.getComponent(x, y)).toBeTruthy();
      }
    }
    expect(() => reactor.getComponent(0, 1)).toThrowError(CoordsError);
    expect(() => reactor.getComponent(1, 0)).toThrowError(CoordsError);
    expect(() => reactor.getComponent(4, 2)).toThrowError(CoordsError);
    expect(() => reactor.getComponent(2, 7)).toThrowError(CoordsError);
  });

  it('has empty grid', () => {
    for (let x = 1; x <= reactor.gridCols; x++) {
      for (let y = 1; y <= reactor.gridRows; y++) {
        expect(reactor.getComponentType(x, y)).toBe(ComponentBrand.EmptyComponent);
      }
    }
    expect(() => reactor.getComponentType(2, 7)).toThrowError(CoordsError);
  });

  it('can set components by class', () => {
    const component = reactor.setComponentClass(3, 5, UraniumCellSingle);
    expect(reactor.getComponentType(3, 5)).toBe(ComponentBrand.UraniumCellSingle);
    expect(reactor.getComponent(3, 5)).toBe(component);

    expect(() => reactor.setComponentClass(2, 7, UraniumCellSingle)).toThrowError(CoordsError);
  });

  it('can set components by brand', () => {
    const component = reactor.setComponentClass(3, 5, ComponentBrand.UraniumCellSingle);
    expect(reactor.getComponentType(3, 5)).toBe(ComponentBrand.UraniumCellSingle);
    expect(reactor.getComponent(3, 5)).toBe(component);

    expect(() => reactor.setComponentClass(2, 7, ComponentBrand.UraniumCellSingle)).toThrowError(
      CoordsError
    );
  });

  it('cannot set reactor component to grid', () => {
    reactor.setComponentClass(2, 2, ComponentBrand.UraniumCellSingle);
    expect(() => reactor.setComponentClass(2, 2, ReactorComponent)).toThrowError(
      ComponentTypeError
    );
    expect(reactor.getComponentType(2, 2)).toBe(ComponentBrand.UraniumCellSingle);

    expect(() => reactor.setComponentClass(2, 2, ComponentBrand.ReactorComponent)).toThrowError(
      ComponentTypeError
    );
    expect(reactor.getComponentType(2, 2)).toBe(ComponentBrand.UraniumCellSingle);
  });

  it('can get correct neighbour coords', () => {
    expect(reactor.getNeighbourCoords(2, 2)).toEqual([
      { x: 2, y: 3 },
      { x: 2, y: 1 },
      { x: 3, y: 2 },
      { x: 1, y: 2 }
    ]);
    expect(reactor.getNeighbourCoords(9, 1)).toEqual([{ x: 9, y: 2 }, { x: 8, y: 1 }]);
  });

  it('can get correct neighbours', () => {
    reactor.setComponentClass(1, 1, UraniumCellSingle);
    reactor.setComponentClass(1, 3, UraniumCellSingle);
    reactor.setComponentClass(1, 4, UraniumCellSingle);

    expect(reactor.getNeighbours(1, 2)).toEqual([
      reactor.getComponent(1, 3),
      reactor.getComponent(1, 1)
    ]);
    expect(reactor.getNeighbours(2, 1)).toEqual([reactor.getComponent(1, 1)]);
  });
});
