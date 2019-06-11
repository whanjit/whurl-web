/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();//*/

//import './assets.js'

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react'

//import ScrollToTop from './components/ScrollToTop'

import App from './App'
import NotFound from './pages/404'

import history from './utils/history'
import store from './stores'







ReactDOM.render((
  <Provider {...store}>
    <Router history={history}>
      
        <Switch>
          <Route path="/" component={App} />
          <Route component={NotFound} />
        </Switch>
      
    </Router>
  </Provider>
), document.getElementById('root'))
