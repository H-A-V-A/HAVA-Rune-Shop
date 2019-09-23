import 'jsdom-global/register'
import React from 'react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {Router} from 'react-router-dom'
import history from '../history'
import {mount} from 'enzyme'
import {expect} from 'chai'
import CartItem from './cartItem'
import Cart from './cart'

describe('<Cart/>', () => {
  const mockState = {
    orders: {cart: {orderProducts: []}},
    user: {}
  }
  const mockStore = configureStore()
  const store = mockStore(mockState)

  let wrapper
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Router history={history} key={location.pathname}>
          <Cart />
        </Router>
      </Provider>
    )
  })

  it('renders the title in an h1', () => {
    expect(wrapper.find('h1').text()).to.be.equal('Cart')
  })

  it('displays a message if there are no items', () => {
    expect(wrapper.find('#no-items').text()).to.be.equal('No items in cart!')
  })

  it('renders the total cost as 0 if there are no items', () => {
    expect(wrapper.find('#cart-price').text()).to.be.equal('0')
  })
})
