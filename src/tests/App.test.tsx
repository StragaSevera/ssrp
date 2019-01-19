import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../App';
import { StoreComponent } from '../components/StoreComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StoreComponent><App /></StoreComponent>, div);
  ReactDOM.unmountComponentAtNode(div);
});
