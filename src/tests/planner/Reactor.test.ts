import { Reactor } from '../../planner/Reactor';
import { ComponentType } from '../../planner/ComponentType';
import { UraniumCellSingle } from '../../planner/components/UraniumCellSingle';

describe('Reactor', () => {
  let reactor: Reactor;
  beforeEach(() => {
    reactor = new Reactor();
  });

  it('has default grid 9x6', () => {
    for (let x = 1; x <= 9; x++) {
      for (let y = 1; y <= 6; y++) {
        expect(reactor.getComponent(x, y)).toBeTruthy();
      }
    }
    expect(() => reactor.getComponent(0, 1)).toThrowError();
    expect(() => reactor.getComponent(1, 0)).toThrowError();
    expect(() => reactor.getComponent(10, 4)).toThrowError();
    expect(() => reactor.getComponent(4, 7)).toThrowError();
  });

  it('has changable grid (3x6)', () => {
    reactor = new Reactor(0);
    for (let x = 1; x <= 3; x++) {
      for (let y = 1; y <= 6; y++) {
        expect(reactor.getComponent(x, y)).toBeTruthy();
      }
    }
    expect(() => reactor.getComponent(0, 1)).toThrowError();
    expect(() => reactor.getComponent(1, 0)).toThrowError();
    expect(() => reactor.getComponent(4, 2)).toThrowError();
    expect(() => reactor.getComponent(2, 7)).toThrowError();
  });

  it('has empty grid', () => {
    for (let x = 1; x <= reactor.gridCols; x++) {
      for (let y = 1; y <= reactor.gridRows; y++) {
        expect(reactor.getComponentType(x, y)).toBe(ComponentType.EmptyComponent);
      }
    }
    expect(() => reactor.getComponentType(2, 7)).toThrowError();
  });

  it('can set components by class', () => {
    const component = reactor.setComponentType(3, 5, UraniumCellSingle);
    expect(reactor.getComponentType(3, 5)).toBe(ComponentType.UraniumCellSingle);
    expect(reactor.getComponent(3, 5)).toBe(component);
    expect(() => reactor.setComponentType(2, 7, UraniumCellSingle)).toThrowError();
  });

  it('can get correct neighbour coords', () => {
    expect(reactor.getNeighbourCoords({ x: 2, y: 2 })).toEqual([
      { x: 1, y: 2 },
      { x: 3, y: 2 },
      { x: 2, y: 1 },
      { x: 2, y: 3 }
    ]);
    expect(reactor.getNeighbourCoords(9, 1)).toEqual([{ x: 8, y: 1 }, { x: 9, y: 2 }]);
  });

  it('can get correct neighbours', () => {
    reactor.setComponentType(1, 1, UraniumCellSingle);
    reactor.setComponentType(1, 3, UraniumCellSingle);
    expect(reactor.getNeighbours({ x: 1, y: 2 })).toEqual([
      reactor.getComponent(1, 1),
      reactor.getComponent(1, 3)
    ]);

    expect(reactor.getNeighbours(2, 1)).toEqual([reactor.getComponent(1, 1)]);
  });
});
