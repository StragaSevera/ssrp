import { Reactor } from '../../../planner/Reactor';
import { UraniumCellSingle } from '../../../planner/components/UraniumCellSingle';
import { CoolantCell20k } from '../../../planner/components/CoolantCell20k';

describe('Uranium Cell (single)', () => {
  let reactor: Reactor;
  let cell: UraniumCellSingle;
  beforeEach(() => {
    reactor = new Reactor();
    cell = reactor.setComponentClass(2, 2, UraniumCellSingle) as UraniumCellSingle;
  });

  describe('with heat', () => {
    it('pulses solo to reactor heat', () => {
      cell.tick();
      expect(reactor.nextHeat).toBe(4);
    });

    it('pulses to one neighbour', () => {
      const neighbour = reactor.setComponentClass(1, 2, CoolantCell20k);
      cell.tick();
      expect(reactor.nextHeat).toBe(0);
      expect(neighbour.nextHeat).toBe(4);
    });

    it('pulses to four neighbours', () => {
      const neighbours = [
        reactor.setComponentClass(1, 2, CoolantCell20k),
        reactor.setComponentClass(2, 1, CoolantCell20k),
        reactor.setComponentClass(3, 2, CoolantCell20k),
        reactor.setComponentClass(2, 3, CoolantCell20k)
      ];
      const neighbourHeat = [1, 1, 1, 1];
      cell.tick();
      expect(reactor.nextHeat).toBe(0);
      expect(neighbours.map(v => v.nextHeat)).toEqual(neighbourHeat);
    });

    it('pulses to three neighbours in correct order', () => {
      const neighbours = [
        reactor.setComponentClass(2, 3, CoolantCell20k),
        reactor.setComponentClass(2, 1, CoolantCell20k),
        reactor.setComponentClass(3, 2, CoolantCell20k)
      ];
      const neighbourHeat = [2, 1, 1];
      cell.tick();
      expect(reactor.nextHeat).toBe(0);
      expect(neighbours.map(v => v.nextHeat)).toEqual(neighbourHeat);
    });

    it('generates more heat when near another cell', () => {
      reactor.setComponentClass(1, 2, UraniumCellSingle);
      cell.tick();
      expect(reactor.nextHeat).toBe(12);
    });
  });

  describe('with energy', () => {
    it('pulses solo to reactor energy', () => {
      cell.tick();
      expect(reactor.nextEU).toEqual(5);
    });

    it('generates more energy when near another cell', () => {
      reactor.setComponentClass(1, 2, UraniumCellSingle);
      cell.tick();
      expect(reactor.nextEU).toBe(10);
    });
  });
});
