import React, { useState, useEffect, useContext } from 'react'
import { Switch, Route, Redirect, HashRouter as Router } from 'react-router-dom'
import { AppTheme, SplashScreen, NavBar, NavBarLink, NavSearchSuggestion } from 'react-windows-ui'
import Login from './pages/login'
import Asignar from './pages/asignar'
import Bitacora from './pages/bitacora'
import Categoria from './pages/categorias'
import Equipos from './pages/equipos'
import Perfil from './pages/perfil'
import Home from './pages/home'
import Empleado from './pages/empleados'
import Configuracion from './pages/configuraciones'
import Areas from './pages/areas'
import Sucursal from './pages/sucursales'
import Ciudad from './pages/ciudades'
import MasterPage from './components/MasterPage'
import Campos from './pages/campos'
import Grupo from './pages/grupos'

const App = () => {

  return (
    <Router>
      <Switch>
        <Route path="/" component={Login}  exact />
        <Route exact path="/react-windows-ui">
            <Redirect to="/" />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/asignar" component={Asignar} />
        <Route path="/empleado" component={Empleado} />
        <Route path="/bitacora" component={Bitacora} />
        <Route path="/categoria" component={Categoria} />
        <Route path="/equipo" component={Equipos} />
        <Route path="/perfil" component={Perfil} />
        <Route path="/configuraciones" component={Configuracion} />
        <Route path="/ciudades" component={Ciudad} />
        <Route path="/master" component={MasterPage} />
        <Route path="/sucursal" component={Sucursal} />
        <Route path="/areas" component={Areas} />
        <Route path="/campos" component={Campos} />
        <Route path="/grupos" component={Grupo} />
      </Switch>
    </Router>
  )
}
    
export default App;