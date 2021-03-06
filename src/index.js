// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import 'sanitize.css/sanitize.css';

import * as serviceWorker from './serviceWorker';

// Import root app
import App from './containers/App';
// Import CSS reset and Global Styles
import 'styles/theme.scss';

// Import all initialization stuff
import { registerOpenSans } from './config/init';

registerOpenSans();

ReactDOM.render(
  <App />, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
