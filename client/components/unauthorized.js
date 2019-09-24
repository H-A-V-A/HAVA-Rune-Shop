import React from 'react'
import {ContainerVertical} from '../components'

/**
 * COMPONENT
 */
const Unauthorized = props => {
  return (
    <ContainerVertical className="flex status">
      <div className="status-text">
        <p>401</p>
        <p>Unauthorized</p>
      </div>
      <img src="/images/guard.png" />
    </ContainerVertical>
  )
}

export default Unauthorized
