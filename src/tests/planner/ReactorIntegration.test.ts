import { ComponentClass } from '../../planner/ComponentClass';
import { UraniumCellSingle } from '../../planner/components/UraniumCellSingle';
import { Reactor } from '../../planner/Reactor';
import { HeatVent } from '../../planner/components/HeatVent';
import { Component } from '../../planner/Component';
import { CoolantCell20k } from '../../planner/components/CoolantCell20k';

interface ReactorSchemeGroup {
  name?: string;
  xname?: string;
  schemes: ReactorScheme[];
}

interface ReactorScheme {
  eu: number;
  heat: number;
  components: SchemeComponent[];
}

interface SchemeComponent {
  x: number;
  y: number;
  type: ComponentClass;
  heat?: number;
}

describe('Integration tests for reactor', () => {
  const reactorSchemesList: ReactorSchemeGroup[] = [
    {
      name: 'Simple schemes without vents',
      schemes: [
        {
          eu: 5,
          heat: 4,
          components: [{ x: 2, y: 2, type: UraniumCellSingle }]
        },
        {
          eu: 20,
          heat: 24,
          components: [
            { x: 2, y: 2, type: UraniumCellSingle },
            { x: 3, y: 2, type: UraniumCellSingle }
          ]
        },
        {
          eu: 35,
          heat: 48,
          components: [
            { x: 2, y: 2, type: UraniumCellSingle },
            { x: 3, y: 2, type: UraniumCellSingle },
            { x: 2, y: 3, type: UraniumCellSingle }
          ]
        },
        {
          eu: 60,
          heat: 96,
          components: [
            { x: 2, y: 2, type: UraniumCellSingle },
            { x: 3, y: 2, type: UraniumCellSingle },
            { x: 2, y: 3, type: UraniumCellSingle },
            { x: 3, y: 3, type: UraniumCellSingle }
          ]
        },
        {
          eu: 65,
          heat: 108,
          components: [
            { x: 2, y: 2, type: UraniumCellSingle },
            { x: 3, y: 2, type: UraniumCellSingle },
            { x: 2, y: 3, type: UraniumCellSingle },
            { x: 1, y: 2, type: UraniumCellSingle },
            { x: 2, y: 1, type: UraniumCellSingle }
          ]
        }
      ]
    },
    {
      name: 'Schemes with single cells and coolant',
      schemes: [
        {
          eu: 5,
          heat: 0,
          components: [
            { x: 1, y: 2, type: CoolantCell20k, heat: 4 },
            { x: 2, y: 2, type: UraniumCellSingle }
          ]
        },
        {
          eu: 10,
          heat: 0,
          components: [
            { x: 1, y: 1, type: UraniumCellSingle },
            { x: 1, y: 2, type: CoolantCell20k, heat: 8 },
            { x: 2, y: 2, type: UraniumCellSingle }
          ]
        },
        {
          eu: 20,
          heat: 12,
          components: [
            { x: 1, y: 1, type: UraniumCellSingle },
            { x: 1, y: 2, type: UraniumCellSingle },
            { x: 2, y: 2, type: CoolantCell20k, heat: 12 }
          ]
        }
      ]
    },
    {
      xname: 'Schemes with single cells and vents',
      schemes: [
        {
          eu: 5,
          heat: 0,
          components: [{ x: 2, y: 2, type: UraniumCellSingle }, { x: 1, y: 2, type: HeatVent }]
        }
      ]
    }
  ];

  for (const schemeGroup of reactorSchemesList) {
    if (!schemeGroup.name) {
      continue;
    }
    describe(schemeGroup.name, () => {
      for (let i = 0; i < schemeGroup.schemes.length; i++) {
        const scheme = schemeGroup.schemes[i];

        it(`#${i}: should generate ${scheme.eu} EU and ${scheme.heat} heat per tick`, () => {
          const reactor = new Reactor();
          const componentsHeat: Array<{ heat: number; component: Component }> = [];
          for (const cInfo of scheme.components) {
            const component = reactor.setComponentClass(cInfo.x, cInfo.y, cInfo.type);
            const heat = cInfo.heat || 0;
            componentsHeat.push({ component, heat });
          }
          reactor.tick();
          expect(reactor.currentEU).toEqual(scheme.eu);
          expect(reactor.currentHeat).toEqual(scheme.heat);
          for (const cHeat of componentsHeat) {
            expect(cHeat.component.currentHeat).toEqual(cHeat.heat);
          }
        });
      }
    });
  }
});
