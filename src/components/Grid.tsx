import * as React from 'react';
import styles from './Grid.module.css';

export class Grid extends React.Component {
  public contents() {
    Array(6)
      .fill(1)
      .map((_, i) => i);

    return Array(6)
      .fill(1)
      .map((_, i) => (
        <tr key={i}>
          {Array(9)
            .fill(1)
            .map((__, j) => (
              <td key={j}>E</td>
            ))}
        </tr>
      ));
  }
  public render() {
    return (
      <table className={styles.error}>
        <tr>
          <td>{JSON.stringify(styles)}</td>
        </tr>
        {this.contents()}
      </table>
    );
  }
}
