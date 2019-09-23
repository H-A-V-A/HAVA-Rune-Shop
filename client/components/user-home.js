import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {ContainerVertical} from '../components'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <ContainerVertical>
      <h3>Welcome to RuneShop, {email}</h3>
    </ContainerVertical>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
