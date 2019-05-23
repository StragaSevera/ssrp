import { Reactor } from '../../../planner/Reactor';
import { CoolantCell20k } from '../../../planner/components/CoolantCell20k';

describe('Coolant Cell 20k', () => {
  let reactor: Reactor;
  let component: CoolantCell20k;
  beforeEach(() => {
    reactor = new Reactor();
    component = reactor.setComponentClass(2, 2, CoolantCell20k);
  });

  describe('with energy', () => {
    it('does not emit any energy', () => {
      component.tick();
      expect(reactor.nextEU).toEqual(0);
    });
  });

  describe('with heat', () => {
    it('has max heat 20000', () => {
      expect(component.maxHeat).toBe(20000);
    });

    it('does not emit any heat to reactor', () => {
      component.fullTick();
      expect(reactor.currentHeat).toBe(0);
    });

    it('does not emit any heat to itself', () => {
      component.fullTick();
      expect(component.nextHeat).toBe(0);
    });
  });
});
