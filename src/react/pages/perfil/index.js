/**
 * @file Componente - Perfil
 * @author Christopher Ortiz
 * @namespace Perfil
 * @description Pantalla que gestiona las credenciales de acceso, crear nuevos usuarios y mi última actividad de autenticación
 * @version 1.0.0
 */
import { NavPageContainer, Link } from 'react-windows-ui'
import React, { useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import { useAuthState } from '../../stores/AuthStore'
import useState from 'react-usestateref'



const Perfil = () => {

  const authState = useAuthState();
  const [loading, setLoading] = useState(true);
  const [logs, setLogs, logsRef] = useState();
  const [username, setUsername, usernameRef] = useState("");
  const [password, setPassword, passwordRef] = useState("");
  const [confirmPassword, setConfirmPassword, confirmPasswordRef] = useState("");

  const [usernameR, setUsernameR, usernameRefR] = useState("");
  const [passwordR, setPasswordR, passwordRefR] = useState("");
  const [confirmPasswordR, setConfirmPasswordR, confirmPasswordRefR] = useState("");

  useEffect(() => {
    getLoginsRecords();
  }, [])

/**
 * Obtiene los últimos veinte inicios de sesión o cierres de sesión
 * @function getMaintenanceRecords
 * @memberof Perfil
 * @async
 * @return void
 * @inner
 */
  const getLoginsRecords = async () => {
    const response = await fetch(process.env.REACT_APP_HOME + "auth/sessions/" + authState.me.get().username, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    setLogs(data)
    console.log(data)
  }

/**
 * Actualiza las credenciales de acceso al usuario logueado
 * @function updateCredentials
 * @memberof Perfil
 * @async
 * @return void
 * @inner
 */
  const updateCredentials = async () => {
    if (password === confirmPassword) {
      try {
        const response = await fetch(process.env.REACT_APP_HOME + "auth/update/" + authState.me.get().username, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "ContraseniaUsuario": password })
        })
        const data = await response.json()
        alert("Contraseña actualizada exitosamente")
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        alert("Error al actualizar la contraseña " + error)
      }
    } else {
      alert("Las contraseñas no coinciden")
    }
  }

/**
 * Registra un nuevo usuario en el sistema
 * @function registerUser
 * @memberof Perfil
 * @async
 * @return void
 * @inner
 */
  const registerUser = async () => {
    if (passwordR === confirmPasswordR) {
      try {
        const response = await fetch(process.env.REACT_APP_HOME + "auth/register", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "NombreUsuario": usernameR, "ContraseniaUsuario": passwordR })
        })
        const data = await response.json()
        alert("Usuario registrado exitosamente")
        setUsernameR("");
        setPasswordR("");
        setConfirmPasswordR("");
      } catch (error) {
        alert("Error al actualizar la contraseña " + error)
      }
    } else {
      alert("Las contraseñas no coinciden")
    }
  }

  /**
 * Limpia los campos después de una actualización o un registro de usuario
 * @function cleanData
 * @memberof Perfil
 * @async
 * @return void
 * @inner
 */
  const cleanData = () => {
    setPassword("");
    setConfirmPassword("");
    setPasswordR("");
    setConfirmPasswordR("");
  }



  return (
    <>
      {
        // loading ?
        <>
          <NavigationWindow />
          <NavPageContainer
            hasPadding={true}
            animateTransition={true}>
            <h1>Perfil</h1>
            <div className='app-hr'></div>
            <p>Gestiona tus credenciales e inicios de sesión.</p>
            <div style={{ display: "flex", flex: 1, marginRight: "30px" }}>
              <div style={{ flex: 1 }}>
                <h2>Mi registro de inicios de sesión</h2>
                <table style={{ width: '100%' }} className="styled-table" id="table-products">
                  <thead>
                    <tr>
                      <th>Accion</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      logsRef.current?.map((item) => {
                        return (
                          <tr key={item.IdBitacora}>
                            <td>
                              {item.Accion}
                            </td>
                            <td>
                              {item.FechaF}
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "10px", marginLeft: "20px" }}>
                <div style={{ flex: 1 }}>
                  <h2>Editar mis credenciales de acceso</h2>
                  <div className='app-hr'></div>
                  <div style={{ marginTop: "20px", marginBottom: "20px", display: "flex", alignItems: "center" }}>
                    <label>Nombre de usuario:</label>
                    <input className='app-input-text' value={authState.me.get().username} readOnly={true} style={{ marginLeft: "10px" }} />
                  </div>
                  <div style={{ marginTop: "20px", marginBottom: "20px", display: "flex", alignItems: "center" }}>
                    <label>Contraseña:</label>
                    <input className='app-input-text' value={password} onChange={(e) => setPassword(e.target.value)} type="password" style={{ marginLeft: "10px" }} />
                  </div>
                  <div style={{ marginTop: "20px", marginBottom: "20px", display: "flex", alignItems: "center" }}>
                    <label>Confirmar contraseña</label>
                    <input className='app-input-text' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" style={{ marginLeft: "10px" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "30px" }}>
                    <button className='app-button animate primary' style={{ margin: "20px 15px" }} onClick={updateCredentials}>Actualizar mis datos</button>
                    <button className='app-button animate primary' style={{ margin: "20px 15px" }} onClick={cleanData}>Cancelar</button>
                  </div>


                  <h2>Nuevo Usuario</h2>
                  <div className='app-hr'></div>
                  <div style={{ marginTop: "20px", marginBottom: "20px", display: "flex", alignItems: "center" }}>
                    <label>Nombre de usuario:</label>
                    <input className='app-input-text' value={usernameR} onChange={(e) => setUsernameR(e.target.value)} style={{ marginLeft: "10px" }} />
                  </div>
                  <div style={{ marginTop: "20px", marginBottom: "20px", display: "flex", alignItems: "center" }}>
                    <label>Contraseña:</label>
                    <input className='app-input-text' value={passwordR} onChange={(e) => setPasswordR(e.target.value)} type="password" style={{ marginLeft: "10px" }} />
                  </div>
                  <div style={{ marginTop: "20px", marginBottom: "20px", display: "flex", alignItems: "center" }}>
                    <label>Confirmar contraseña</label>
                    <input className='app-input-text' value={confirmPasswordR} onChange={(e) => setConfirmPasswordR(e.target.value)} type="password" style={{ marginLeft: "10px" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "30px" }}>
                    <button className='app-button animate primary' style={{ margin: "20px 15px" }} onClick={registerUser}>Crear nuevo usuario</button>
                    <button className='app-button animate primary' style={{ margin: "20px 15px" }} onClick={cleanData}>Cancelar</button>
                  </div>
                </div>
                <div style={{ flex: 1 }}>

                </div>
              </div>
            </div>
          </NavPageContainer>
        </>
        //  : <></>
      }
    </>
  );
}

export default Perfil