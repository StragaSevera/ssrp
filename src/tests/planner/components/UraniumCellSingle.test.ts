import { Reactor } from '../../../planner/Reactor';
import { UraniumCellSingle } from '../../../planner/components/UraniumCellSingle';
import { CoolantCell20k } from '../../../planner/components/CoolantCell20k';

describe('Uranium Cell (single)', () => {
  let reactor: Reactor;
  let component: UraniumCellSingle;
  beforeEach(() => {
    reactor = new Reactor();
    component = reactor.setComponentClass(2, 2, UraniumCellSingle) as UraniumCellSingle;
  });

  describe('with energy', () => {
    it('pulses solo to reactor energy', () => {
      component.tick();
      expect(reactor.nextEU).toEqual(5);
    });

    it('generates more energy when near another cell', () => {
      reactor.setComponentClass(1, 2, UraniumCellSingle);
      component.tick();
      expect(reactor.nextEU).toBe(10);
    });

    it('generates more energy when near two cells', () => {
      reactor.setComponentClass(1, 2, UraniumCellSingle);
      reactor.setComponentClass(3, 2, UraniumCellSingle);
      component.tick();
      expect(reactor.nextEU).toBe(15);
    });
  });

  describe('with heat', () => {
    it('pulses solo to reactor heat', () => {
      component.tick();
      expect(reactor.nextHeat).toBe(4);
    });

    it('pulses to one neighbour', () => {
      const neighbour = reactor.setComponentClass(1, 2, CoolantCell20k);
      component.tick();
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
      component.tick();
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
      component.tick();
      expect(reactor.nextHeat).toBe(0);
      expect(neighbours.map(v => v.nextHeat)).toEqual(neighbourHeat);
    });

    it('generates more heat when near another cell', () => {
      reactor.setComponentClass(1, 2, UraniumCellSingle);
      component.tick();
      expect(reactor.nextHeat).toBe(12);
    });

    it('generates more heat when near two cells', () => {
      reactor.setComponentClass(1, 2, UraniumCellSingle);
      reactor.setComponentClass(3, 2, UraniumCellSingle);
      component.tick();
      expect(reactor.nextHeat).toBe(24);
    });

    it('passes more heat to neighbours when near two cells', () => {
      reactor.setComponentClass(1, 2, UraniumCellSingle);
      reactor.setComponentClass(3, 2, UraniumCellSingle);
      const neighbours = [
        reactor.setComponentClass(2, 3, CoolantCell20k),
        reactor.setComponentClass(2, 1, CoolantCell20k)
      ];
      component.tick();
      expect(reactor.nextHeat).toBe(0);
      expect(neighbours.map(v => v.nextHeat)).toEqual([12, 12]);
    });
  });
});
