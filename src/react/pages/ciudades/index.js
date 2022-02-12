
import { NavPageContainer,Link } from 'react-windows-ui'
import React, { useState, useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'

const Ciudad = () => {
    return (
      <>
        <NavigationWindow/>
            <NavPageContainer
            hasPadding={true}
            animateTransition={true}>

            <h1>Ciudades</h1>
            <p>Gestiona los ciudades registradas en el sistema</p>
            <Link>Components here</Link>
        </NavPageContainer>
    </>
  );
}

export default Ciudad