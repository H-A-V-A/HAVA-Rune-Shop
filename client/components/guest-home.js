import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {ContainerVertical} from '../components'
import {PromoList} from './index'

/**
 * COMPONENT
 */
const GuestHome = props => {
  // const {email} = props

  return (
    <ContainerVertical id="home-content">
      <img src="/images/HavasPotions.png" id="home-banner" />
      <PromoList />
    </ContainerVertical>
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
