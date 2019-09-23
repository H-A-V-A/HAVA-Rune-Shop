import React from 'react'
import {ContainerVertical} from '../components'

/**
 * COMPONENT
 */
const NotFound = props => {
  return (
    <ContainerVertical className="flex status">
      <div className="status-text">
        <p>404</p>
        <p>Not Found!</p>
      </div>
      <img src="/images/Wizard.png" />
    </ContainerVertical>
  )
}

export default NotFound
