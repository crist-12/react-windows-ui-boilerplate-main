import React from 'react'
import { Switch, Route, Redirect, HashRouter as Router } from 'react-router-dom'
import { useAuth } from './hooks/useIsAuth'
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
import Computadora from './pages/computadoras'
import Historial from './pages/historial'
import Mantenimiento from './pages/mantenimientos'



const App = () => {
  


  return (
    <Router>
      <Switch>
        <Route path="/" component={Login}  exact />
        <Route exact path="/react-windows-ui">
            <Redirect to="/" />
        </Route>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/asignar" component={Asignar} />
        <PrivateRoute path="/empleado" component={Empleado} />
        <PrivateRoute path="/bitacora" component={Bitacora} />
        <PrivateRoute path="/categoria" component={Categoria} />
        <PrivateRoute path="/equipo" component={Equipos} />
        <PrivateRoute path="/perfil" component={Perfil} />
        <PrivateRoute path="/configuraciones" component={Configuracion} />
        <PrivateRoute path="/ciudades" component={Ciudad} />
        <PrivateRoute path="/master" component={MasterPage} />
        <PrivateRoute path="/sucursal" component={Sucursal} />
        <PrivateRoute path="/areas" component={Areas} />
        <PrivateRoute path="/campos" component={Campos} />
        <PrivateRoute path="/grupos" component={Grupo} />
        <PrivateRoute path="/computadoras" component={Computadora} />
        <PrivateRoute path="/historial" component={Historial} />
        <PrivateRoute path="/mantenimientos" component={Mantenimiento} />
      </Switch>
    </Router>
  )
}


const PrivateRoute=({ component: Component, ...rest })=> {
  // useAuth es un hook personalizado para obtener el estado de autenticación del usuario actual
  const isAuth = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

    
export default App;