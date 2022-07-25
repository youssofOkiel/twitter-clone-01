import React, {useEffect} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Login from './components/Login/Login'
import './App.css'
import {useStateValue} from './contexts/StateContextProvider'
import {actionTypes} from './contexts/StateReducers'

const App = () => {
  const [{user}, dispatch] = useStateValue()

  useEffect(() => {
      dispatch({
        type: actionTypes.SET_USER,
        user: JSON.parse(localStorage.getItem('twitter_user'))
      })    
  }, [])

  return (
    <div className="app">
    {
      user?
      <Router>  

      </Router>
      :
      <Login />
    }
    </div>   
  )
}

export default App
