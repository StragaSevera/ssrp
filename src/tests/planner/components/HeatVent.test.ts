import { Reactor } from '../../../planner/Reactor';
import { HeatVent } from '../../../planner/components/HeatVent';

describe('Heat Vent', () => {
  let reactor: Reactor;
  let vent: HeatVent;
  beforeEach(() => {
    reactor = new Reactor();
    vent = reactor.setComponentClass(2, 2, HeatVent) as HeatVent;
  });

  describe('with energy', () => {
    it('does not emit any energy', () => {
      vent.tick();
      expect(reactor.nextEU).toEqual(0);
    });
  });

  describe('with heat', () => {
    it('does not emit any heat to reactor', () => {
      vent.fullTick();
      expect(reactor.currentHeat).toBe(0);
    });

    it('does not emit any heat to itself', () => {
      vent.fullTick();
      expect(vent.nextHeat).toBe(0);
    });

    it('lowers its heat when heated by 6', () => {
      vent.addNextHeat(6);
      vent.tick();
      expect(vent.nextHeat).toBe(0);
      vent.finalizeTick();
      expect(vent.currentHeat).toBe(0);
    });
  });
});
