import React from 'react'
import { ClipLoader } from 'halogenium'

export default class Loading extends React.Component {
  render() {
    let loading = this.props.loading || false
    let content
    if (loading) {
      content = (
        <div className="loading-div">
          <ClipLoader
            loading={loading}
            color="#26548F"
            size="36px"
            margin="4px" />
        </div>
      )
    } else {
      content = this.props.children
    }

    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    )
  }
}