import { Reactor } from '../../../planner/Reactor';
import { CoolantCell20k } from '../../../planner/components/CoolantCell20k';
import { UraniumCellQuad } from '../../../planner/components/UraniumCellQuad';

describe('Uranium Cell (quad)', () => {
  let reactor: Reactor;
  let component: UraniumCellQuad;
  beforeEach(() => {
    reactor = new Reactor();
    component = reactor.setComponentClass(2, 2, UraniumCellQuad) as UraniumCellQuad;
  });

  describe('with energy', () => {
    it('pulses solo to reactor energy', () => {
      component.tick();
      expect(reactor.nextEU).toEqual(60);
    });

    it('generates more energy when near another cell', () => {
      reactor.setComponentClass(1, 2, UraniumCellQuad);
      component.tick();
      expect(reactor.nextEU).toBe(80);
    });

    it('generates more energy when near two cells', () => {
      reactor.setComponentClass(1, 2, UraniumCellQuad);
      reactor.setComponentClass(3, 2, UraniumCellQuad);
      component.tick();
      expect(reactor.nextEU).toBe(100);
    });
  });

  describe('with heat', () => {
    it('pulses solo to reactor heat', () => {
      component.tick();
      expect(reactor.nextHeat).toBe(96);
    });

    it('pulses to one neighbour', () => {
      const neighbour = reactor.setComponentClass(1, 2, CoolantCell20k);
      component.tick();
      expect(reactor.nextHeat).toBe(0);
      expect(neighbour.nextHeat).toBe(96);
    });

    it('pulses to four neighbours', () => {
      const neighbours = [
        reactor.setComponentClass(1, 2, CoolantCell20k),
        reactor.setComponentClass(2, 1, CoolantCell20k),
        reactor.setComponentClass(3, 2, CoolantCell20k),
        reactor.setComponentClass(2, 3, CoolantCell20k)
      ];
      const neighbourHeat = [24, 24, 24, 24];
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
      const neighbourHeat = [32, 32, 32];
      component.tick();
      expect(reactor.nextHeat).toBe(0);
      expect(neighbours.map(v => v.nextHeat)).toEqual(neighbourHeat);
    });

    it('generates more heat when near another cell', () => {
      reactor.setComponentClass(1, 2, UraniumCellQuad);
      component.tick();
      expect(reactor.nextHeat).toBe(160);
    });

    it('generates more heat when near two cells', () => {
      reactor.setComponentClass(1, 2, UraniumCellQuad);
      reactor.setComponentClass(3, 2, UraniumCellQuad);
      component.tick();
      expect(reactor.nextHeat).toBe(240);
    });

    it('passes more heat to neighbours when near two cells', () => {
      reactor.setComponentClass(1, 2, UraniumCellQuad);
      reactor.setComponentClass(3, 2, UraniumCellQuad);
      const neighbours = [
        reactor.setComponentClass(2, 3, CoolantCell20k),
        reactor.setComponentClass(2, 1, CoolantCell20k)
      ];
      component.tick();
      expect(reactor.nextHeat).toBe(0);
      expect(neighbours.map(v => v.nextHeat)).toEqual([120, 120]);
    });
  });
});
