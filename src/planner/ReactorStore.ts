import { action, observable, runInAction } from 'mobx';
import { Reactor } from './Reactor';
import { ComponentBrand } from './ComponentBrand';

export class ReactorStore {
  @observable
  public reactor!: Reactor;
  public selectedComponent!: ComponentBrand;

  constructor(chambers?: number) {
    runInAction(() => {
      this.reactor = new Reactor(chambers);
      this.selectedComponent = ComponentBrand.EmptyComponent;
    });
  }

  @action.bound
  public recount() {
    this.reactor.refresh();
    this.reactor.tick();
  }

  @action.bound
  public tick() {
    this.reactor.tick();
  }
}

export interface ReactorStoreProps {
  store?: ReactorStore;
}
