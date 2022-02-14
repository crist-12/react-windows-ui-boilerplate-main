import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AppTheme, SplashScreen, NavBar, NavBarLink, NavSearchSuggestion } from 'react-windows-ui'
import Page0 from '../pages/page0'
import Page1 from '../pages/page1'
import Page2 from '../pages/page2'
import Login from '../pages/login'
import Img from '../assets/mountain.jpg'
import {DataContext} from '../context/DataContext'

const NavigationWindow = () => {

  const {theme} = useContext( DataContext );

    return(
    <>
    <AppTheme
      scheme= {'light'}/>
    <NavBar 
      title="Kassa"
     // mobileHasIcons={true}
      shadowOnScroll={true}>

      <NavSearchSuggestion
        placeholder="Buscar en las páginas.."
        tooltip="Búsqueda"
        data={[
          {label: 'home', link: '/', icon: <i className="icons10-home"></i>},
          {label: 'asignar', link: '/asignar', icon: <i className="icons10-link"></i>}
        ]}
      />

      <h1>Módulos</h1>
      <div className="app-hr"></div>

      <NavBarLink
        to="/home"
        exact={true}
        text="Home"
        icon={<i className='icons10-home'></i>}
      />

      <NavBarLink
        to="/asignar"
        text="Asignar"
        icon={<i className="icons10-link"></i>}
      />

      <NavBarLink
        to="/empleado"
        text="Empleado"
        icon={<i className="icons10-user"></i>}
      />

      <NavBarLink
        to="/equipo"
        text="Equipos"
        icon={<i className="icons10-notebook"></i>}
      />

      <NavBarLink
        to="/categoria"
        text="Categorías"
        icon={<i className="icons10-parallel-tasks"></i>}
      />

      <NavBarLink
        to="/bitacora"
        text="Bitácora"
        icon={<i className="icons10-tasks"></i>}
      />

      <NavBarLink
        to="/perfil"
        text="Mi Perfil"
        icon={<i className="icons10-user-settings"></i>}
      />

      <NavBarLink
        to="/configuraciones"
        text="Configuraciones"
        icon={<i className="icons10-settings"></i>}
      />
    </NavBar>
    </>
    )
}

export default NavigationWindow;