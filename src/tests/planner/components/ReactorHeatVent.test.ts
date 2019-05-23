import { Reactor } from '../../../planner/Reactor';
import { ReactorHeatVent } from '../../../planner/components/ReactorHeatVent';

describe('Heat Vent', () => {
  let reactor: Reactor;
  let component: ReactorHeatVent;
  beforeEach(() => {
    reactor = new Reactor();
    component = reactor.setComponentClass(2, 2, ReactorHeatVent);
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

    it('lowers heat of reactor by 5', () => {
      reactor.reactorComponent.addNextHeat(100);
      component.tick();
      expect(reactor.nextHeat).toBe(95);
    });

    it('does not emit any heat to itself', () => {
      component.fullTick();
      expect(component.nextHeat).toBe(0);
    });

    it('lowers its heat when heated by 5', () => {
      component.addNextHeat(7);
      component.tick();
      expect(component.nextHeat).toBe(2);
      component.finalizeTick();
      expect(component.currentHeat).toBe(2);
    });
  });
});
