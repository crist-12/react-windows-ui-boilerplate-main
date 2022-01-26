
import { NavPageContainer,Link } from 'react-windows-ui'
import React, { useState, useEffect, useContext } from 'react'
import NavigationWindow from '../../components/Navigation'
import { AppTheme } from 'react-windows-ui'
import { ColorPickerItem } from 'react-windows-ui'
import { DataContext } from '../../context/DataContext'

const Empleado = () => {

  const {theme, color} = useContext( DataContext );

    return (
      <>
        <NavigationWindow/>

            <NavPageContainer
            hasPadding={true}
            animateTransition={true}>
            
            <h1>Empleados</h1>
            <p>Start adding your fantastic ui here.</p>
            <div className="app-hr"></div>

        </NavPageContainer>
    </>
  );
}

export default Empleado