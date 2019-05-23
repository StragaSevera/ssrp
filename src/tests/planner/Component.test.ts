import { Component } from '../../planner/Component';
import { Reactor } from '../../planner/Reactor';
import { ComponentError } from '../../planner/Errors';
import { ComponentBrand } from '../../const/ComponentBrand';

class MockComponent extends Component {
  constructor(reactor: Reactor, x: number, y: number) {
    super(reactor, x, y);
    this.brand = ComponentBrand.UraniumCellSingle;
  }

  public tick = jest.fn();
}

describe('Component features', () => {
  let reactor: Reactor;
  let component: MockComponent;
  beforeEach(() => {
    reactor = new Reactor();
    component = new MockComponent(reactor, 2, 3);
  });

  describe('with basics', () => {
    it('can be initialized', () => {
      expect(component.coords.x).toBe(2);
      expect(component.coords.y).toBe(3);
    });

    it('cannot manipulate heat by default', () => {
      expect(() => component.addNextHeat(5)).toThrowError(ComponentError);
      expect(() => component.lowerNextHeat(5)).toThrowError(ComponentError);
    });

    it('has heat ratio zero by default', () => {
      expect(component.heatRatio).toBe(0);
    });
  });

  describe('if maxHeat > 0', () => {
    it('can increase heat', () => {
      jest.spyOn(component, 'maxHeat', 'get').mockReturnValue(1000);
      component.addNextHeat(5);
      expect(component.nextHeat).toBe(5);
    });

    it('can lower heat', () => {
      jest.spyOn(component, 'maxHeat', 'get').mockReturnValue(1000);
      component.lowerNextHeat(5);
      expect(component.nextHeat).toBe(-5);
    });

    it('has correct heat ratio', () => {
      jest.spyOn(component, 'maxHeat', 'get').mockReturnValue(1000);
      component.currentHeat = 25;
      expect(component.heatRatio).toBe(25 / 1000);
    });

    it('can refresh', () => {
      jest.spyOn(component, 'maxHeat', 'get').mockReturnValue(1000);
      component.currentHeat = 2;
      component.addNextHeat(5);
      component.refresh();
      expect(component.currentHeat).toBe(0);
      expect(component.nextHeat).toBe(0);
    });
  });

  describe('with ticking', () => {
    it('ticks on fullTick', () => {
      component.fullTick();
      expect(component.tick).toBeCalled();
    });

    it('does not tick on finalizeTick', () => {
      component.finalizeTick();
      expect(component.tick).not.toBeCalled();
    });

    it('processes heat on finalizeTick', () => {
      jest.spyOn(component, 'maxHeat', 'get').mockReturnValue(1000);
      component.currentHeat = 2;
      component.addNextHeat(5);
      component.finalizeTick();
      expect(component.currentHeat).toBe(7);
      expect(component.nextHeat).toBe(0);
    });

    it('parses negative heat to zero on finalizeTick', () => {
      jest.spyOn(component, 'maxHeat', 'get').mockReturnValue(1000);
      component.currentHeat = 2;
      component.lowerNextHeat(5);
      component.finalizeTick();
      expect(component.currentHeat).toBe(0);
      expect(component.nextHeat).toBe(0);
    });
  });
});
