import { ComponentBrand } from '../planner/ComponentBrand';
import * as React from 'react';
import styles from './ImageComponent.module.scss';

interface Props {
  brand: ComponentBrand;
  selected?: boolean;
}

function getImageURI(brand: ComponentBrand): string {
  return 'assets/components/' + brand.toString() + '.png';
}

function getClassNames(props: Props) {
  const result: string[] = [styles.img_component];
  if (props.selected) {
    result.push(styles.selected);
  }
  return result.join(' ');
}

export const ImageComponent: React.FunctionComponent<Props> = props => {
  const uri = getImageURI(props.brand);
  if (uri) {
    return <img src={uri} alt={props.brand} className={getClassNames(props)} />;
  } else {
    return null;
  }
};
