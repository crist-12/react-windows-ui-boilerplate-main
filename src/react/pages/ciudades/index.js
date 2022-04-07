/**
 * @file Componente - Ciudades
 * @author Christopher Ortiz
 * @namespace Ciudades
 * @description Pantalla que permite la creación de los registros de las ciudades donde la empresa tenga sucursales.
 * @version 1.0.0
 */
import { NavPageContainer, Link } from 'react-windows-ui'
import React, { useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import { Dialog, Button } from 'react-windows-ui'
import MaterialTable from 'material-table'
import Modal from '../../components/Modal';
import useState from 'react-usestateref';
import Loader from 'react-js-loader';

const Ciudad = () => {

  /**
   * Hook encargado de mostrar/ocultar el modal para añadir una nueva ciudad
   * @function setShowModal
   * @memberof Ciudades
   * @return types {boolean}
   * @inner
   */
  const [showModal, setShowModal] = useState(false);
  //const [ciudad, setCiudad] = useState("")
  /**
   * Hook encargado de traer el listado de ciudades desde la base de datos 
   * @function setListCities
   * @memberof Ciudades
   * @return types {Object}
   * @inner
   */
  const [listCities, setListCities] = useState("")
  /**
   * Hook encargado de manejar el estado de si está cargando o no el componente
   * @function setLoading
   * @memberof Ciudades
   * @return loading {boolean}
   * @inner
   */
  const [loading, setLoading] = useState(true)
  /**
   * Hook encargado de manejar el valor del nombre de la ciudad a añadir/actualizar
   * @function setDefaultName
   * @memberof Ciudades
   * @return defaultName {Object}
   * @inner
   */
  const [defaultName, setDefaultName, defaultNameRef] = useState()
  /**
   * Hook encargado de manejar el código de la ciudad a modificar
   * @function setSelectedIndex
   * @memberof Ciudades
   * @return selectedIndex {Object}
   * @inner
   */
  const [selectedIndex, setSelectedIndex, selectedIndexRef] = useState()
  /**
   * Hook encargado de manejar el valor del modal de añadir una nueva ciudad
   * @function setAddModal
   * @memberof Ciudades
   * @return addModal {boolean}
   * @inner
   */
  const [addModal, setAddModal] = useState(false)

  useEffect(() => {
    getCitiesData()
  }, [])
  /**
   * Función encargada de insertar una nueva ciudad a la base de datos
   * @function addNewCity
   * @memberof Ciudades
   * @return void
   * @inner
   */
  const addNewCity = async () => {
    if (defaultName) {
      try {
        setLoading(true)
        const response = await fetch(process.env.REACT_APP_HOME + "city", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "NombreCiudad": defaultNameRef.current })
        })
        const result = await response.json()
        console.log(result)
        await getCitiesData()
        setAddModal(false)
        setLoading(false)
        setDefaultName("")
        alert("La ciudad se guardo exitosamente")
      } catch (error) {
        alert("Ocurrio un error al guardar la ciudad")
      }
    } else {
      alert("El nombre de la ciudad no puede ir vacio")
    }
  }
  /**
   * Función encargada de actualizar una ciudad en la base de datos
   * @function updateCityRow
   * @memberof Ciudades
   * @return void
   * @inner
   */
  const updateCityRow = async () => {
    if (defaultName) {
      try {
        setLoading(true)
        const response = await fetch(process.env.REACT_APP_HOME + "city/" + selectedIndexRef.current, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "NombreCiudad": defaultNameRef.current })
        })
        const result = await response.json();
        console.log(result)
        await getCitiesData()
        setShowModal(false)
        setLoading(false)
        setDefaultName("")
        alert("La categoria se actualizó exitosamente")
      } catch (error) {
        alert("Ocurrio un error al actualizar la categoria")
      }
    } else {
      alert("El nombre de la ciudad no puede ir vacio")
    }
  }
  /**
   * Función encargada de listar las ciudades registradas en la base de datos
   * @function getCitiesData
   * @memberof Ciudades
   * @return void
   * @inner
   */
  const getCitiesData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "city", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const result = await response.json()

      setListCities(result)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * Maneja la búsqueda en la tabla, función que se encarga de filtrar los datos de la tabla
   * @name searchTableAll
   * @function
   * @memberof Ciudades
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
   * Función manejadora de los procesos necesarios para actualizar una ciudad
   * @name handleUpdateCity
   * @function
   * @memberof Ciudades
   * @inner
   * @return {void}
  */
  const handleUpdateCity = async (nombre, codigo) => {
    setDefaultName(nombre);
    setSelectedIndex(codigo);
    setShowModal(true)
  }

  return (
    <>
      {
        loading ? <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}>
          <Loader type="spinner-circle" bgColor={"#000"} title={"Cargando..."} color={'#000'} size={100} />
        </div> :
          <>
            <NavigationWindow />
            <NavPageContainer
              hasPadding={true}
              animateTransition={true}>

              <Modal showOverlay={true} show={showModal} onClose={() => setShowModal(false)} size={"md"}>
                <Modal.Header>
                  <Modal.Title>Actualizar Ciudad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* <img src={currentImageRef.current} width="700px" height="auto" /> */}
                  <table style={{ width: '100%' }} className="styled-table" id="table-products">
                    <thead>
                      <tr>
                        <th>Caracteristica</th>
                        <th>Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Nombre de la ciudad</td>
                        <td>
                          <input type="text" className='app-input-text' value={defaultName} onChange={(e) => setDefaultName(e.target.value)} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Modal.Body>
                <Modal.Footer>
                  <Button value="Aceptar" onClick={updateCityRow} />
                  <Button value="Cerrar" onClick={() => setShowModal(false)} />
                </Modal.Footer>
              </Modal>

              <Modal showOverlay={true} show={addModal} onClose={() => setAddModal(false)} size={"md"}>
                <Modal.Header>
                  <Modal.Title>Nueva Ciudad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* <img src={currentImageRef.current} width="700px" height="auto" /> */}
                  <table style={{ width: '100%' }} className="styled-table" id="table-products">
                    <thead>
                      <tr>
                        <th>Caracteristica</th>
                        <th>Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Nombre de la Ciudad</td>
                        <td>
                          <input type="text" className='app-input-text' value={defaultName} onChange={(e) => setDefaultName(e.target.value)} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Modal.Body>
                <Modal.Footer>
                  <Button value="Aceptar" onClick={addNewCity} />
                  <Button value="Cerrar" onClick={() => setAddModal(false)} />
                </Modal.Footer>
              </Modal>


              <h1>Ciudades</h1>
              <p>Añada, modifique o elimine registro de ciudades</p>
              <div className="app-hr"></div>
              <div style={{ marginTop: "20px", marginRight: "30px", display: "flex", flex: 1, flexDirection: "column" }}>
                <div style={{ marginTop: "15px", display: "flex" }}>
                  <div style={{ flex: 1 }}>
                    <label>Buscar</label>
                    <input className='app-input-text' id="search-input-table" placeholder='Buscar...' style={{ marginLeft: "20px" }} onKeyUp={searchTableAll} />
                  </div>
                  <div style={{ flex: 1, justifyContent: "flex-end", display: "flex" }}>
                    <button className='app-button primary animate' onClick={() => setAddModal(true)}>Nueva Ciudad</button>
                  </div>
                </div>
                <table style={{ width: '100%' }} className="styled-table" id="table-products">
                  <thead>
                    <tr>
                      <th>Ciudad</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      listCities?.map((item, index) => {
                        return (
                          <tr>
                            <td>{item.NombreCiudad}</td>
                            <td style={{ display: "flex", justifyContent: "center" }}>
                              <button className='app-button primary animate' onClick={() => handleUpdateCity(item.NombreCiudad, item.IdCiudad)}>Actualizar</button>
                            </td>
                          </tr>
                        )
                      })
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

export default Ciudad