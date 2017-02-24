import React from 'react'
import './Result.css'
const { string } = React.PropTypes

function Result (props) {
  return (
    <article className="result-cell">
      <a href={this.props.link}>
        <h2>{this.props.headline}</h2>
      </a>
      <p>{this.props.description}</p>
    </article>
  )
}

Result.propTypes = {
  link: string,
  headline: string,
  description: string
}

export default Result
