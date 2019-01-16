import { ComponentType } from '../ComponentType';
import { Component } from '../Component';

interface HeatEU {
  eu: number;
  heat: number;
}

export class UraniumCellSingle extends Component {
  public type = ComponentType.UraniumCellSingle;

  private static getEUHeat(neighbours: Component[]): HeatEU {
    const reflectorNeighbours = neighbours.filter(n => n.isReflector());
    const pulses = 1 + reflectorNeighbours.length;
    return {
      eu: 5 * pulses,
      heat: 2 * pulses * (pulses + 1)
    };
  }

  public isHeatable(): boolean {
    return false;
  }

  public isReflector(): boolean {
    return true;
  }

  public tick(): void {
    const neighbours = this.getNeighbours();
    const { eu, heat } = UraniumCellSingle.getEUHeat(neighbours);

    this.reactorComponent.addNextEU(eu);

    const heatableNeighbours = neighbours.filter(n => n.isHeatable());
    if (heatableNeighbours.length === 0) {
      this.reactorComponent.addNextHeat(heat);
    } else {
      const heatPerNeighbour = Math.floor(heat / heatableNeighbours.length);
      for (const neighbour of heatableNeighbours) {
        neighbour.addNextHeat(heatPerNeighbour);
      }
      heatableNeighbours[0].addNextHeat(heat % heatableNeighbours.length);
    }
  }
}
