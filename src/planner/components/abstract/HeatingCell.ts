import { ComponentBrand } from '../../../const/ComponentBrand';
import { action, observable } from 'mobx';
import { Component } from '../../Component';
import { HeatingMaterial } from './HeatingMaterials';

interface HeatEU {
  eu: number;
  heat: number;
}

export abstract class HeatingCell extends Component {
  @observable
  public brand!: ComponentBrand;

  protected abstract get arity(): number;
  protected abstract get material(): HeatingMaterial;

  private getEUHeat(neighbours: Component[]): HeatEU {
    const reflectorNeighbours = neighbours.filter(n => n.isReflector);
    const pulses = 1 + reflectorNeighbours.length + Math.floor(this.arity / 2);
    return {
      eu: this.material.energyMultiplier * this.arity * pulses,
      heat: 2 * this.arity * pulses * (pulses + 1)
    };
  }

  public get isReflector(): boolean {
    return true;
  }

  @action
  public tick(): void {
    const neighbours = this.neighbours;
    const { eu, heat } = this.getEUHeat(neighbours);

    this.reactorComponent.addNextEU(eu);

    const heatableNeighbours = neighbours.filter(n => n.isHeatable);
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
