
import { NavPageContainer,Link } from 'react-windows-ui'
import React, { useState, useEffect, useContext } from 'react'
import NavigationWindow from '../../components/Navigation'
import { AppTheme } from 'react-windows-ui'
import { ColorPickerItem } from 'react-windows-ui'

const Home = () => {
    return (
      <>
        <NavigationWindow/>

            <NavPageContainer
            hasPadding={true}
            animateTransition={true}>
            
            <h1>Home</h1>
            <p>Start adding your fantastic ui here.</p>
            <Link>Components here</Link>
        </NavPageContainer>
    </>
  );
}

export default Home