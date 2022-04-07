/**
 * @file Componente - Grupos
 * @author Christopher Ortiz
 * @namespace Grupos
 * @description Grupos de productos
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

const Grupo = () => {

  const [showModal, setShowModal] = useState(false);
  const [listAreas, setListAreas] = useState()
  const [loading, setLoading] = useState(true)
  const [defaultName, setDefaultName, defaultNameRef] = useState()
  const [selectedIndex, setSelectedIndex, selectedIndexRef] = useState()
  const [addModal, setAddModal] = useState(false)

  useEffect(() => {
    getGroupsData()
  }, [])
  /**
   * Filtra en la tabla buscando por todos los campos
   * @function addNewGroup
   * @memberof Grupos
   * @async
   * @return void
   * @inner
   */
  const addNewGroup = async () => {
    if (defaultName) {
      try {
        setLoading(true)
        const response = await fetch(process.env.REACT_APP_HOME + "groups", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "DescripcionGrupo": defaultNameRef.current })
        })
        const result = await response.json()
        console.log(result)
        await getGroupsData()
        setAddModal(false)
        setLoading(false)
        setDefaultName("")
        alert("El area se guardo exitosamente")
      } catch (error) {
        alert("Ocurrio un error al guardar el area")
      }
    } else {
      alert("El nombre del area no puede ir vacio")
    }
  }
  /**
   * Actualiza los datos de un grupo
   * @function updateGroupRow
   * @memberof Grupos
   * @async
   * @return void
   * @inner
   */
  const updateGroupRow = async () => {
    if (defaultName) {
      try {
        setLoading(true)
        const response = await fetch(process.env.REACT_APP_HOME + "groups/" + selectedIndexRef.current, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "DescripcionGrupo": defaultNameRef.current })
        })
        const result = await response.json();
        console.log(result)
        await getGroupsData()
        setShowModal(false)
        setLoading(false)
        setDefaultName("")
        alert("El area se actualizó exitosamente")
      } catch (error) {
        alert("Ocurrio un error al actualizar la categoria")
      }
    } else {
      alert("El nombre del area no puede ir vacio")
    }
  }

  /**
   * Obtiene los datos de los grupos
   * @function getGroupsData
   * @memberof Grupos
   * @async
   * @return void
   * @inner
   */
  const getGroupsData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "groups", {
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
   * Filtra en la tabla por todos los campos
   * @function searchTableAll
   * @memberof Grupos
   * @async
   * @return void
   * @inner
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
   * Función encargada de los procesos que realizan la actualización de un grupo
   * @function handleUpdateGroup
   * @memberof Grupos
   * @async
   * @return void
   * @inner
   */
  const handleUpdateGroup = async (nombre, codigo) => {
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
                  <Modal.Title>Actualizar Grupo</Modal.Title>
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
                        <td>Nombre del Grupo</td>
                        <td>
                          <input type="text" className='app-input-text' value={defaultName} onChange={(e) => setDefaultName(e.target.value)} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Modal.Body>
                <Modal.Footer>
                  <Button value="Aceptar" onClick={updateGroupRow} />
                  <Button value="Cerrar" onClick={() => setShowModal(false)} />
                </Modal.Footer>
              </Modal>

              <Modal showOverlay={true} show={addModal} onClose={() => setAddModal(false)} size={"md"}>
                <Modal.Header>
                  <Modal.Title>Nuevo Grupo</Modal.Title>
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
                        <td>Nombre del Grupo</td>
                        <td>
                          <input type="text" className='app-input-text' value={defaultName} onChange={(e) => setDefaultName(e.target.value)} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Modal.Body>
                <Modal.Footer>
                  <Button value="Aceptar" onClick={addNewGroup} />
                  <Button value="Cerrar" onClick={() => setAddModal(false)} />
                </Modal.Footer>
              </Modal>


              <h1>Grupos</h1>
              <p>Añada, modifique o elimine registro de grupos de productos</p>
              <div className="app-hr"></div>
              <div style={{ marginTop: "20px", marginRight: "30px", display: "flex", flex: 1, flexDirection: "column" }}>
                <div style={{ marginTop: "15px", display: "flex" }}>
                  <div style={{ flex: 1 }}>
                    <label>Buscar</label>
                    <input className='app-input-text' id="search-input-table" placeholder='Buscar...' style={{ marginLeft: "20px" }} onKeyUp={searchTableAll} />
                  </div>
                  <div style={{ flex: 1, justifyContent: "flex-end", display: "flex" }}>
                    <button className='app-button primary animate' onClick={() => setAddModal(true)}>Nuevo Grupo</button>
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
                            <td>{item.DescripcionGrupo}</td>
                            <td style={{ display: "flex", justifyContent: "center" }}>
                              <button className='app-button primary animate' onClick={() => handleUpdateGroup(item.DescripcionGrupo, item.IdGrupo)}>Actualizar</button>
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

export default Grupo