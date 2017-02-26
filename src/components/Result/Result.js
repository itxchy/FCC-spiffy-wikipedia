import React from 'react'
import './Result.css'
const { string } = React.PropTypes

function Result (props) {
  return (
    <article className='result-cell'>
      <a href={props.link}>
        <h2 className='result-headline'>{props.headline}</h2>
      </a>
      <p className='result-description'>{props.description}</p>
    </article>
  )
}

Result.propTypes = {
  link: string,
  headline: string,
  description: string
}

export default Result
