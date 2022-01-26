
import { NavPageContainer,Link } from 'react-windows-ui'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AppTheme, SplashScreen, NavBar, NavBarLink, NavSearchSuggestion } from 'react-windows-ui'
import Page0 from '../page0/'
import Page2 from '../page2'
import Login from '../login'
import Img from '../../assets/mountain.jpg'
import NavigationWindow from '../../components/Navigation'

const Page1 = () => {



    return (
      <>
  <NavigationWindow/>
    <NavPageContainer
      hasPadding={true}
      animateTransition={true}>

      <h1>Page 1</h1>
      <p>Start adding your fantastic ui here.</p>
      <Link>Components here</Link>
     
    </NavPageContainer>
    </>
  );
}

export default Page1