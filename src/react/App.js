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
import {DataContext, DataProvider} from './context/DataContext'

import { channels } from '../shared/constants';
const { ipcRenderer } = window;

const App = () => {

  const [splash, setSplash] = useState(true);
  

  useEffect(() => {
   setSplash(false);
  }, [])

  return (
    <DataProvider>
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
      </Switch>
    </Router>
    </DataProvider>
  )
}
    
export default App;