import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AppTheme, SplashScreen, NavBar, NavBarLink, NavSearchSuggestion } from 'react-windows-ui'
import Page0 from './pages/page0'
import Page1 from './pages/page1'
import Page2 from './pages/page2'
import Login from './pages/login'
import Img from './assets/mountain.jpg'


const NavigationWindow = () => {
    return(
        <>
<SplashScreen
      //duration={1000} // adjust how long it takes after render 
      isVisible={splash}
      title={"Kassa"}
    />

    <AppTheme //added AppTheme to make app reactive with theme
      scheme="system" // available props - 'light', 'dark' or 'system'
    />

    <NavBar 
      title="Kassa"
     // mobileHasIcons={true}
      shadowOnScroll={true}>

      {/* Optional component - emphasizes navbar Search funtionality */}

      <NavSearchSuggestion
        placeholder="Buscar en las páginas.."
        tooltip="Búsqueda"
        data={[
          {label: 'home', link: '/', icon: <i className="icons10-home"></i>},
          {label: 'Page 1', link: '/page1'},
          {label: 'Page 2', link: '/page2'}
        ]}
      />

      <h1>Pages</h1>
      <div className="app-hr"></div>

      <NavBarLink
        to="/"
        exact={true}
        text="Home"
        img={Img}
      />

      <NavBarLink
        to="/page1"
        text="Page1"
        icon={<i className="icons10-grid-2"></i>}
      />

      <NavBarLink
        to="/page2"
        text="Page2"
        icon={<i className="icons10-columns"></i>}
      />

    </NavBar>
    </>
    )
}
      