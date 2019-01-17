import { CoordsDict, coordsN, CoordsTuple } from '../../planner/Coords';

describe('coords normalization', () => {
  it('can convert from tuple to itself', () => {
    const coords: CoordsTuple = [1, 2];
    expect(coordsN(coords)).toBe(coords);
  });

  it('can convert from array to tuple', () => {
    const coords: number[] = [1, 2];
    expect(coordsN(coords)).toBe(coords);
  });

  it('cannot convert from invalid array to tuple', () => {
    const coords: number[] = [1, 2, 3];
    expect(() => coordsN(coords)).toThrowError();
  });

  it('can convert from dict to tuple', () => {
    const coords: CoordsDict = { x: 1, y: 2 };
    expect(coordsN(coords)).toEqual([1, 2]);
  });

  it('can convert from ints to tuple', () => {
    expect(coordsN(1, 2)).toEqual([1, 2]);
  });
});
