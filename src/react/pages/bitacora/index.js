/**
 * @file Componente - Bitácpra
 * @author Christopher Ortiz
 * @namespace Bitácora
 * @description Componente que contiene la bitácora de los movimientos realizados en el sistema.
 * @version 1.0.0
 */
import { NavPageContainer, Link } from 'react-windows-ui'
import React, { useState, useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import Loader from 'react-js-loader'

const Bitacora = () => {
  /**
   * setLogs Obtiene los registros de la bitácora
   * @function setLogs
   * @memberof Bitácora
   * @return logs {Object}
   * @inner
   */
  const [logs, setLogs] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBitacoraRecords();
  }, [])

  /**
   * searchTableAll Maneja la búsqueda en la tabla, función que se encarga de filtrar los datos de la tabla
   * @name searchTableAll
   * @function
   * @memberof Bitácora
   * @inner
   * @return {void}
  */
  const searchTableAll = () => {
    var searchBox = document.getElementById('search-input-table');
    var table = document.getElementById("table-products");
    var trs = table.tBodies[0].getElementsByTagName("tr");
    var filter = searchBox.value.toUpperCase();
    for (var rowI = 0; rowI < trs.length; rowI++) {
      var tds = trs[rowI].getElementsByTagName("td");
      trs[rowI].style.display = "none";
      for (var cellI = 0; cellI < tds.length; cellI++) {
        if (tds[cellI].innerHTML.toUpperCase().indexOf(filter) > -1) {
          trs[rowI].style.display = "";
          continue;
        }
      }
    }
  }

  /**
   * getBitacoraRecords Obtiene los datos de la bitacóra 
   * @name getBitacoraRecords
   * @function
   * @memberof Bitácora
   * @async
   * @inner
   * @return {void}
  */
  const getBitacoraRecords = async () => {
    const response = await fetch(process.env.REACT_APP_HOME + "bitacora", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    setLogs(data)
    setLoading(false)
  }
  return (
    <>
      {
        loading ?
          <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}>
            <Loader type="spinner-circle" bgColor={"#000"} title={"Cargando..."} color={'#000'} size={100} />
          </div>
          :
          <>
            <NavigationWindow />
            <NavPageContainer
              hasPadding={true}
              animateTransition={true}>

              <h1>Bitacora</h1>
              <p>Analiza los últimos movimientos realizados en el sistema.</p>
              <div style={{ display: "flex", flex: 1, marginRight: "30px", flexDirection: "column" }}>
                <div style={{ marginTop: "15px", display: "flex", flex: 1 }}>
                  <div style={{ flex: 1 }}>
                    <label>Buscar</label>
                    <input className='app-input-text' id="search-input-table" placeholder='Buscar...' style={{ marginLeft: "20px" }} onKeyUp={searchTableAll} />
                  </div>
                </div>
                <table style={{ width: '100%' }} className="styled-table" id="table-products">
                  <thead>
                    <tr>
                      <th>Acción</th>
                      <th>Módulo</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      logs ?
                        logs.map((ele, index) => {
                          return (
                            <tr>
                              <td>{ele.Accion}</td>
                              <td>{ele.Modulo}</td>
                              <td>{ele.FechaF}</td>
                            </tr>
                          )
                        }) : <></>
                    }
                  </tbody>
                </table>
              </div>
            </NavPageContainer>
          </>
      }
    </>
  );
}

export default Bitacora