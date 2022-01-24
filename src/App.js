import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { AppTheme, SplashScreen, NavBar, NavBarLink, NavSearchSuggestion } from 'react-windows-ui'
import Login from './pages/login'
import Asignar from './pages/asignar'
import Bitacora from './pages/bitacora'
import Categoria from './pages/categorias'
import Equipos from './pages/equipos'
import Perfil from './pages/perfil'
import Home from './pages/home'
import Configuracion from './pages/configuraciones'
import {DataContext, DataProvider} from './context/DataContext'


const App = () => {

  const [splash, setSplash] = useState(true);
  const {theme} = useContext( DataContext );

  useEffect(() => {
   setSplash(false);
  }, [])

  return (
    <DataProvider>
      <AppTheme
      scheme="system" 
    />
    <Router>
      <Switch>
        <Route path="/" component={Login}  exact />
        <Route exact path="/react-windows-ui">
            <Redirect to="/" />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/asignar" component={Asignar} />
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