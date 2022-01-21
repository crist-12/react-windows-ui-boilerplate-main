
import { NavPageContainer,Link } from 'react-windows-ui'
import React, { useState, useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'

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