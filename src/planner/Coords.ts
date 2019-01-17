export interface CoordsDict {
  x: number;
  y: number;
}

export type CoordsTuple = [number, number];

export function coordsN(coords: CoordsDict | CoordsTuple | number[]): CoordsTuple;
export function coordsN(x: number, y: number): CoordsTuple;
export function coordsN(a: number | number[] | CoordsDict | CoordsTuple , b?: number): CoordsTuple {
  if (a instanceof Array) {
    if (a.length !== 2) throw new Error('Invalid coords type!');
    return a as CoordsTuple;
  } else if (typeof a === 'object') {
    return [a.x, a.y];
  } else {
    return [a, b!];
  }
}
