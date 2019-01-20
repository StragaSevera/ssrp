import { Reactor } from '../../../planner/Reactor';
import { UraniumCellDouble } from '../../../planner/components/UraniumCellDouble';
import { CoolantCell20k } from '../../../planner/components/CoolantCell20k';

describe('Uranium Cell (double)', () => {
  let reactor: Reactor;
  let cell: UraniumCellDouble;
  beforeEach(() => {
    reactor = new Reactor();
    cell = reactor.setComponentClass(2, 2, UraniumCellDouble) as UraniumCellDouble;
  });

  describe('with heat', () => {
    it('pulses solo to reactor heat', () => {
      cell.tick();
      expect(reactor.nextHeat).toBe(24);
    });

    it('pulses to one neighbour', () => {
      const neighbour = reactor.setComponentClass(1, 2, CoolantCell20k);
      cell.tick();
      expect(reactor.nextHeat).toBe(0);
      expect(neighbour.nextHeat).toBe(24);
    });

    it('pulses to four neighbours', () => {
      const neighbours = [
        reactor.setComponentClass(1, 2, CoolantCell20k),
        reactor.setComponentClass(2, 1, CoolantCell20k),
        reactor.setComponentClass(3, 2, CoolantCell20k),
        reactor.setComponentClass(2, 3, CoolantCell20k)
      ];
      const neighbourHeat = [6, 6, 6, 6];
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
      const neighbourHeat = [8, 8, 8];
      cell.tick();
      expect(reactor.nextHeat).toBe(0);
      expect(neighbours.map(v => v.nextHeat)).toEqual(neighbourHeat);
    });

    it('generates more heat when near another cell', () => {
      reactor.setComponentClass(1, 2, UraniumCellDouble);
      cell.tick();
      expect(reactor.nextHeat).toBe(48);
    });
  });

  describe('with energy', () => {
    it('pulses solo to reactor energy', () => {
      cell.tick();
      expect(reactor.nextEU).toEqual(20);
    });

    it('generates more energy when near another cell', () => {
      reactor.setComponentClass(1, 2, UraniumCellDouble);
      cell.tick();
      expect(reactor.nextEU).toBe(30);
    });
  });
});
