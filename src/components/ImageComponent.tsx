import { ComponentBrand } from '../planner/ComponentBrand';
import * as React from 'react';
import styles from './ImageComponent.module.scss';

// Breaking typing? Maybe.
export enum ImageSelection {
  high = 'selected_high',
  medium = 'selected_medium',
  low = 'selected_low'
}

interface Props {
  brand: ComponentBrand;
  selected?: ImageSelection;
  bar?: number;
}

function getImageURI(brand: ComponentBrand): string {
  return 'assets/components/' + brand.toString() + '.png';
}

function getClassNames(props: Props) {
  const result: string[] = [styles.img_component];
  if (props.selected) {
    result.push(styles[props.selected]);
  }
  return result.join(' ');
}

function getBarURI(bar: number) {
  const id = Math.ceil(bar * 14);
  return `assets/Bar${id < 14 ? id : 14}.png`;
}

export const ImageComponent: React.FunctionComponent<Props> = props => {
  const uri = getImageURI(props.brand);
  if (uri) {
    if (props.bar && props.bar > 0) {
      return (
        <div
          style={{
            backgroundImage: `url(${uri})`
          }}
          className={styles.img_container}
        >
          <img src={getBarURI(props.bar)} alt={props.brand} />
        </div>
      );
    } else {
      return <img src={uri} alt={props.brand} className={getClassNames(props)} />;
    }
  } else {
    return null;
  }
};
