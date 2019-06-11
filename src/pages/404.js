import React, { Component } from 'react'

export default class NotFound extends Component {
  render() {
    return (
      <div className="container">
        <div className="row" style={{ textAlign: 'center', marginTop: '15%' }}>
          <h1>Oops!</h1>
          <h2>404 Not Found</h2>
          <div>Sorry, an error has occured, Requested page not found!</div>
        </div>
      </div>
    )
  }
}