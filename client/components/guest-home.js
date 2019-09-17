import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
const GuestHome = props => {
  // const {email} = props

  return (
    <div>
      <h3>Welcome to RuneShop</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     email: state.user.email
//   }
// }
export default GuestHome
// export default connect(mapState)(GuestHome)

/**
 * PROP TYPES
 */
// GuestHome.propTypes = {
//   email: PropTypes.string
// }
