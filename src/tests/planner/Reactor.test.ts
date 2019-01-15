import { ComponentType, Reactor } from '../../planner/Reactor';

describe('Reactor', () => {
  it('has default grid 6x9', () => {
    const reactor = new Reactor();
    expect(reactor.grid.length).toBe(6);
    for (const row of reactor.grid) {
      expect(row.length).toBe(9);
    }
  });

  it('has changable grid', () => {
    const reactor = new Reactor(0);
    expect(reactor.grid.length).toBe(6);
    for (const row of reactor.grid) {
      expect(row.length).toBe(3);
    }
  });

  it('has empty grid', () => {
    const reactor = new Reactor();
    for (const row of reactor.grid) {
      for (const element of row) {
        expect(element.type).toBe(ComponentType.Empty);
      }
    }
  });
});
