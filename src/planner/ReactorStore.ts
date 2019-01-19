import { observable, runInAction } from 'mobx';
import { Reactor } from './Reactor';

export class ReactorStore {
  @observable
  public reactor!: Reactor;

  constructor(chambers?: number) {
    runInAction(() => {
      this.reactor = new Reactor(chambers);
    });
  }
}
