/**
 * @file Componente - Área
 * @author Christopher Ortiz
 * @namespace Area
 * @description Las áreas de la empresa son los departamentos con las que esta cuenta, administra las áreas de la empresa en esta pantalla.
 * @version 1.0.0
 */
import { NavPageContainer, Link } from 'react-windows-ui'
import React, { useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import { Dialog, Button } from 'react-windows-ui'
import MaterialTable from 'material-table'
import Modal from '../../components/Modal';
import useState from 'react-usestateref'

const Area = () => {

/**
 * setShowModal Hook que maneja el modal para actualizar los datos
 * @function setShowModal
 * @memberof Area
 * @return showModal {boolean}
 * @inner
 */
  const [showModal, setShowModal] = useState(false);
/**
 * setListAreas Hook que maneja un listado de áreas registradas en la base de datos
 * @function setListAreas
 * @memberof Area
 * @return listAreas {Object}
 * @inner
 */
  const [listAreas, setListAreas] = useState()
/**
 * setLoading Hook encargado de manejar el loading de la pantalla
 * @function setLoading
 * @memberof Area
 * @return loading {boolean}
 * @inner
 */
  const [loading, setLoading] = useState(true)
/**
 * setDefaultName Hook que maneja el nombre que se está ingresando/actualizando en el modal
 * @function setDefaultName
 * @memberof Area
 * @return defaultName {string}
 * @inner
 */
  const [defaultName, setDefaultName, defaultNameRef] = useState()
/**
 * setSelectedIndex Hook que maneja el índice seleccionado en el select de las áreas
 * @function setSelectedIndex
 * @memberof Area
 * @return selectedIndex {int}
 * @inner
 */
  const [selectedIndex, setSelectedIndex, selectedIndexRef] = useState()
/**
 * setAddModal Hook que maneja el estado del modal para agregar los ítems
 * @function setAddModal
 * @memberof Area
 * @return addModal {boolean}
 * @inner
 */
  const [addModal, setAddModal] = useState(false)

  useEffect(() => {
    getAreasData()
  }, [])

/**
 * Agrega una nueva área al sistema
 * @name addNewArea
 * @function
 * @async
 * @memberof Area
 * @inner
 * @return {void}
*/
  const addNewArea = async () => {
    if (defaultName) {
      try {
        setLoading(true)
        const response = await fetch(process.env.REACT_APP_HOME + "area", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "DescripcionArea": defaultNameRef.current })
        })
        const result = await response.json()
        console.log(result)
        await getAreasData()
        setAddModal(false)
        setLoading(false)
        setDefaultName()
        alert("El area se guardo exitosamente")
      } catch (error) {
        alert("Ocurrio un error al guardar el area")
      }
    } else {
      alert("El nombre del area no puede ir vacio")
    }
  }

/**
 * Maneja la API para actualizar el área que se ha mostrado en el modal
 * @name updateCityRow
 * @function
 * @async
 * @memberof Area
 * @inner
 * @return {void}
*/
  const updateCityRow = async () => {
    if(defaultName){
      try {
        setLoading(true)
        const response = await fetch(process.env.REACT_APP_HOME + "area/"+selectedIndexRef.current, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "DescripcionArea": defaultNameRef.current })
        })
        const result = await response.json();
        console.log(result)
        await getAreasData()
        setShowModal(false)
        setLoading(false)
        setDefaultName()
        alert("El area se actualizó exitosamente")
      } catch (error) {
        alert("Ocurrio un error al actualizar la categoria")
      }
    }else{
      alert("El nombre del area no puede ir vacio")
    }
  }

/**
 * Función que trae los datos de las áreas registradas en la base de datos
 * @name getAreasData
 * @function
 * @async
 * @memberof Area
 * @inner
 * @return {void}
*/
  const getAreasData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "area", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const result = await response.json()

      setListAreas(result)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

/**
 * Maneja la búsqueda en la tabla, función que se encarga de filtrar los datos de la tabla
 * @name searchTableAll
 * @function
 * @memberof Area
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
 * Al momento de actualizar, se deben gestionar varios procesos, primero debe setear el nombre del área en el modal, el código de la selección y mostrar el modal
 * @name handleUpdateCity
 * @function
 * @async
 * @memberof Area
 * @inner
 * @return {void}
*/
  const handleUpdateCity = async(nombre, codigo) => {
    setDefaultName(nombre); 
    setSelectedIndex(codigo); 
    setShowModal(true)
  }

  return (
    <>
      {
        loading ? <></> :
          <>
            <NavigationWindow />
            <NavPageContainer
              hasPadding={true}
              animateTransition={true}>

              <Modal showOverlay={true} show={showModal} onClose={() => setShowModal(false)} size={"md"}>
                <Modal.Header>
                  <Modal.Title>Actualizar Sucursal</Modal.Title>
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
                        <td>Nombre de la Sucursal</td>
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
                  <Modal.Title>Nueva Sucursal</Modal.Title>
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
                        <td>Nombre de la Sucursal</td>
                        <td>
                          <input type="text" className='app-input-text' value={defaultName} onChange={(e) => setDefaultName(e.target.value)} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Modal.Body>
                <Modal.Footer>
                  <Button value="Aceptar" onClick={addNewArea} />
                  <Button value="Cerrar" onClick={() => setAddModal(false)} />
                </Modal.Footer>
              </Modal>


              <h1>Áreas</h1>
              <p>Añada, modifique o elimine registro de áreas de su empresa</p>
              <div className="app-hr"></div>
              <div style={{ marginTop: "20px", marginRight: "30px", display: "flex", flex: 1, flexDirection: "column" }}>
              <div style={{ marginTop: "15px", display: "flex" }}>
                  <div style={{flex: 1}}>
                  <label>Buscar</label>
                  <input className='app-input-text' id="search-input-table" placeholder='Buscar...' style={{ marginLeft: "20px" }} onKeyUp={searchTableAll} />
                  </div>
                  <div style={{flex: 1, justifyContent: "flex-end", display: "flex"}}>
                  <button className='app-button primary animate' onClick={()=> setAddModal(true)}>Nueva Sucursal</button>
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
                      listAreas?.map((item, index) => {
                        return (
                          <tr>
                            <td>{item.DescripcionArea}</td>
                            <td style={{ display: "flex", justifyContent: "center" }}>
                              <button className='app-button primary animate' onClick={() => handleUpdateCity(item.DescripcionArea, item.IdArea)}>Actualizar</button>
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

export default Area