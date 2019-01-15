import { Reactor } from '../../planner/Reactor';
import { ComponentType } from '../../planner/ComponentType';

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
  });

  it('can set components', () => {
    reactor.setComponentType(3, 5, ComponentType.UraniumCellSingle);
    expect(reactor.getComponentType(3, 5)).toBe(ComponentType.UraniumCellSingle);
  });
});
