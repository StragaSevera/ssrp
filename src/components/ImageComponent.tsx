import { ComponentBrand } from '../planner/ComponentBrand';
import * as React from 'react';

function getImageURI(brand: ComponentBrand): string | null {
  if (brand === ComponentBrand.EmptyComponent) {
    return null;
  } else {
    return require('../assets/components/' + brand.toString() + '.png');
  }
}

export const ImageComponent: React.FunctionComponent<{ brand: ComponentBrand }> = ({ brand }) => {
  const uri = getImageURI(brand);
  if (uri) {
    return <img src={uri} alt={brand} />;
  } else {
    return null;
  }
};
