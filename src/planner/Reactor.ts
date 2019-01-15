export class Reactor {
  public grid: object[][] = [];
  public readonly gridRows = 6;
  public readonly defaultGridCols = 3;
  public gridCols: number;

  constructor(chambers: number = 6) {
    this.gridCols = this.defaultGridCols + chambers;
    for (let i = 0; i < this.gridRows; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.gridCols; j++) {
        this.grid[i][j] = {};
      }
    }
  }
}
