import React, { useEffect } from 'react'
import { AppTheme, NavBar, NavBarLink, NavSearchSuggestion } from 'react-windows-ui'
import { useHistory } from 'react-router-dom'
import { useMasterState } from '../stores/MasterStore'
import { useAuthState, logout } from '../stores/AuthStore'
import useState from 'react-usestateref'

const NavigationWindow = () => {

  const [color, setColor, colorRef] = useState();

  const history = useHistory();

  const masterState = useMasterState();
  const authState = useAuthState();

  const handlerSignOut = async () => {
    logout();
    history.push("/");
  }

  useEffect(() => {
    getColorPreference();
  },[])

  const getColorPreference = async()=> {
    const response = await fetch(process.env.REACT_APP_HOME + "auth/color/" + authState.me.get().username, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    setColor(data[0].Color);
    masterState.set({color : colorRef.current});
    console.log(data)
}

  return (
    <>
      <AppTheme
        color={color}
        scheme={'light'}
        onColorChange={() => { }}
        onSchemeChange={() => { }}
      />
      <NavBar
        title="Kassa"
        shadowOnScroll={true}>

        <NavSearchSuggestion
          placeholder="Buscar en las páginas.."
          tooltip="Búsqueda"
          data={[
            { label: 'home', link: '/', icon: <i className="icons10-home"></i> },
            { label: 'asignar', link: '/asignar', icon: <i className="icons10-link"></i> }
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
          to="/computadoras"
          text="Equipo informático"
          icon={<i className="icons10-fax"></i>}
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
          to="/historial"
          text="Historial de Asignaciones"
          icon={<i className="icons10-clock"></i>}
        />

        <NavBarLink
          to="/configuraciones"
          text="Configuraciones"
          icon={<i className="icons10-settings"></i>}
        />

        <div>
          <li className='app-nav-list-item' onClick={handlerSignOut} >
            <a aria-current="page">
              <i class="icons10-shutdown">
              </i>
              <span>Cerrar sesión</span></a>
          </li>
        </div>

      </NavBar>
    </>
  )
}

export default NavigationWindow;