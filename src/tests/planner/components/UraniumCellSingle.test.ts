import { Reactor } from '../../../planner/Reactor';
import { UraniumCellSingle } from '../../../planner/components/UraniumCellSingle';
import { HeatVent } from '../../../planner/components/HeatVent';
import { ReactorComponent } from '../../../planner/components/ReactorComponent';

describe('Uranium Cell (single)', () => {
  let reactor: Reactor;
  let reactorComponent: ReactorComponent;
  let cell: UraniumCellSingle;
  beforeEach(() => {
    reactor = new Reactor();
    reactorComponent = reactor.reactorComponent;
    cell = reactor.setComponentClass(2, 2, UraniumCellSingle) as UraniumCellSingle;
  });

  describe('with heat', () => {
    it('pulses solo to reactor heat', () => {
      cell.tick();
      expect(reactorComponent.nextHeat).toBe(4);
    });

    it('pulses to one neighbour', () => {
      const vent = reactor.setComponentClass(1, 2, HeatVent);
      cell.tick();
      expect(reactorComponent.nextHeat).toBe(0);
      expect(vent.nextHeat).toBe(4);
    });

    it('pulses to four neighbours', () => {
      const vents = [
        reactor.setComponentClass(1, 2, HeatVent),
        reactor.setComponentClass(2, 1, HeatVent),
        reactor.setComponentClass(3, 2, HeatVent),
        reactor.setComponentClass(2, 3, HeatVent)
      ];
      const ventHeat = [1, 1, 1, 1];
      cell.tick();
      expect(reactorComponent.nextHeat).toBe(0);
      expect(vents.map(v => v.nextHeat)).toEqual(ventHeat);
    });

    it('pulses to three neighbours in correct order', () => {
      const vents = [
        reactor.setComponentClass(2, 3, HeatVent),
        reactor.setComponentClass(2, 1, HeatVent),
        reactor.setComponentClass(3, 2, HeatVent)
      ];
      const ventHeat = [2, 1, 1];
      cell.tick();
      expect(reactorComponent.nextHeat).toBe(0);
      expect(vents.map(v => v.nextHeat)).toEqual(ventHeat);
    });

    it('generates more heat when near another cell', () => {
      reactor.setComponentClass(1, 2, UraniumCellSingle);
      cell.tick();
      expect(reactorComponent.nextHeat).toBe(12);
    });
  });

  describe('with energy', () => {
    it('pulses solo to reactor energy', () => {
      cell.tick();
      expect(reactorComponent.nextEU).toEqual(5);
    });

    it('generates more energy when near another cell', () => {
      reactor.setComponentClass(1, 2, UraniumCellSingle);
      cell.tick();
      expect(reactorComponent.nextEU).toBe(10);
    });
  });
});
