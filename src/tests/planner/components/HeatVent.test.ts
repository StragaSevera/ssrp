import { Reactor } from '../../../planner/Reactor';
import { HeatVent } from '../../../planner/components/HeatVent';

describe('Heat Vent', () => {
  let reactor: Reactor;
  let component: HeatVent;
  beforeEach(() => {
    reactor = new Reactor();
    component = reactor.setComponentClass(2, 2, HeatVent);
  });

  describe('with energy', () => {
    it('does not emit any energy', () => {
      component.tick();
      expect(reactor.nextEU).toEqual(0);
    });
  });

  describe('with heat', () => {
    it('has max heat 1000', () => {
      expect(component.maxHeat).toBe(1000);
    });

    it('does not change heat of reactor', () => {
      reactor.reactorComponent.addNextHeat(100);
      component.tick();
      expect(reactor.nextHeat).toBe(100);
    });

    it('does not emit any heat to itself', () => {
      component.fullTick();
      expect(component.nextHeat).toBe(0);
    });

    it('lowers its heat when heated by 6', () => {
      component.addNextHeat(7);
      component.tick();
      expect(component.nextHeat).toBe(1);
      component.finalizeTick();
      expect(component.currentHeat).toBe(1);
    });
  });
});
