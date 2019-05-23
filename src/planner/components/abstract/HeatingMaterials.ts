export interface HeatingMaterial {
  energyMultiplier: number;
  durationMultiplier: number;
}

export const Uranium: HeatingMaterial = {
  energyMultiplier: 5,
  durationMultiplier: 1
};

export const Thorium: HeatingMaterial = {
  energyMultiplier: 1,
  durationMultiplier: 5
};
