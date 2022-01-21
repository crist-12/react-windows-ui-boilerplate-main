import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AppTheme, SplashScreen, NavBar, NavBarLink, NavSearchSuggestion } from 'react-windows-ui'
import Page0 from './pages/page0'
import Page1 from './pages/page1'
import Page2 from './pages/page2'
import Login from './pages/login'
import Img from './assets/mountain.jpg'

const App = () => {

  const [splash, setSplash] = useState(true);

  useEffect(() => {
   setSplash(false);
  }, [])

  return (
    <Router basename="kassa">
      <Switch>
        <Route path="/" component={Login}  exact />
        <Route path="/login" component={Page0} />
        <Route path="/page1" component={Page1} />
        <Route path="/page2" component={Page2} />
      </Switch>

    </Router>
  )
}
    
export default App;