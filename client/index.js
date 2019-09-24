import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
      <ToastContainer autoClose={2000} />
    </Router>
  </Provider>,
  document.getElementById('app')
)
