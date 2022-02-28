import React from 'react'
import { AppTheme,  NavBar, NavBarLink, NavSearchSuggestion } from 'react-windows-ui'

import { useMasterState } from '../stores/MasterStore'

const NavigationWindow = () => {



  const masterState = useMasterState();

    return(
    <>
    <AppTheme
      color = {masterState.get().color}
      scheme= {'light'}
      onColorChange={()=> {}}
      onSchemeChange={()=> {}}
      />
    <NavBar 
      title="Kassa"
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
        text="Entidades"
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