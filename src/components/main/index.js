import React, { Component } from 'react'

export default class MainLayout extends Component {
  render() {
    return (
      <div className="wrapper">
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}