import React, { Component } from 'react'
import { Route } from 'react-router-dom'
//import Button from '@material-ui/core/Button';

import './App.css';

import MainLayout from './components/main'
import Home from './pages/home'
import Auth from './pages/auth'
//import Code from './pages/code'

//<Route exact path="/:code" component={Code} />

export default class App extends Component {
  componentDidMount() {
    //this.props.member.init()
  }


  render() {
    return (
      <MainLayout>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Auth}/>
      </MainLayout>
    )
  }
}

//export default App;
