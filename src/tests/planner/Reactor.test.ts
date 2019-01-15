import { Reactor } from '../../planner/Reactor';

test('has default grid 6x9', () => {
  const reactor = new Reactor();
  expect(reactor.grid.length).toBe(6);
  for (const row of reactor.grid) {
    expect(row.length).toBe(9);
  }
});

test('has changable grid', () => {
  const reactor = new Reactor(0);
  expect(reactor.grid.length).toBe(6);
  for (const row of reactor.grid) {
    expect(row.length).toBe(3);
  }
});
