import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {ContainerVertical} from '../components'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <ContainerVertical id="account-container">
      <h1>Welcome to RuneShop, {email}</h1>
      <div>
        <div className="account-detail">
          <h3>Account Details</h3>
          <p>Email: {email}</p>
          <button type="button">Edit</button>
          <p>Password: ••••••••</p>
          <button type="button">Edit</button>
        </div>
        <div className="account-detail">
          <h3>Payment</h3>
          <p>Everything's on the Fullstack credit card!</p>
        </div>
      </div>
      <div className="account-detail">
        <h3>Order History</h3>
      </div>
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
