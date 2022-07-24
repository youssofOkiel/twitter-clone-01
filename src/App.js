import React, {useEffect} from 'react'
import {BrowserRouter as Router , Route} from 'react-router-dom'
import Login from './components/Login/Login'
import './App.css'
import {useStateValue} from './contexts/StateContextProvider'
import {actionTypes} from './contexts/StateReducers'
import Feed from './components/Feed/Feed'
import Sidebar from './components/Sidebar/Sidebar';
import Widgets from './components/Widgets/Widgets';

const App = () => {
  const [{user}, dispatch] = useStateValue()

  useEffect(() => {
      dispatch({
        type: actionTypes.SET_USER,
        user: JSON.parse(localStorage.getItem('twittie_user'))
      })    
  }, [])

  return (
    <div className="app">
    {
      user?
      <Router>  
        <div className='app__mainContent'>

            <Sidebar />
            <Feed />
            <Widgets />
            {/* <Route exact path='/'>
                <div className="app__main">
                  <Feed />
                </div>         
            </Route> */}
        </div>
     
          
      </Router>
      :
      <Login />
    }
    </div>   
  )
}

export default App
