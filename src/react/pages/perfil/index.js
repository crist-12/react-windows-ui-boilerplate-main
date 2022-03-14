
import { NavPageContainer, Link } from 'react-windows-ui'
import React, { useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import { useAuthState } from '../../stores/AuthStore'
import useState from 'react-usestateref'


const Perfil = () => {

  const authState = useAuthState();
  const [loading, setLoading] = useState(true);
  const [logs, setLogs, logsRef] = useState();


  useEffect(() => {
    getLoginsRecords();
  }, [])

  const getLoginsRecords = async () => {
    const response = await fetch(process.env.REACT_APP_HOME + "auth/sessions/"+authState.me.get().username, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    setLogs(data)
    console.log(data)
   // setLoading(false)
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
                <div style={{ flex: 1 }}>

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