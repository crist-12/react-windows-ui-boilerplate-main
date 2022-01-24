
import { NavPageContainer,Link, NavPageContainerRight } from 'react-windows-ui'
import React, { useState, useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'

const Configuracion = () => {
    return (
      <>
        <NavigationWindow/>
            <NavPageContainer
            hasPadding={true}
            animateTransition={true}>

            <h1>Configuraciones del Sistema</h1>
            <p>Configure sus preferencias del sistema.</p>
            <div className="app-hr"></div>
        </NavPageContainer>
    </>
  );
}
export default Configuracion;