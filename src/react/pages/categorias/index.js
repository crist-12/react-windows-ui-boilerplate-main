
import { NavPageContainer } from 'react-windows-ui'
import React, { useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import "../categorias/index.css"
import { Dialog, Button } from 'react-windows-ui'
import useState from 'react-usestateref'
import Modal from '../../components/Modal';
import Select from 'react-select'
import { useAuthState } from '../../stores/AuthStore';

const Categoria = () => {

  const [showModal, setShowModal] = useState(false);
  const [modalCancel, setModalCancel] = useState(false);
  const [categoria, setCategoria] = useState("")
  const [listCat, setlistCat, listCatRef] = useState([])
  const [loading, setLoading] = useState(true)
  const [keyEdit, setKeyEdit, keyEditRef] = useState(null)
  const [modalActualizar, setModalActualizar] = useState(false)
  const [infoRaw, setInfoRaw, infoRawRef] = useState()
  const [modalCategory, setModalCategory] = useState(false)
  const [newItems, setNewItems, newItemsRef] = useState("")
  const [itemsModal, setItemsModal] = useState(false)
  const [items, setItems, itemsRef] = useState()
  const [itemsSelect, setItemsSelect, itemsSelectRef] = useState([])
  const [modalNew, setModalNew] = useState(false)
  const [types, setTypes, typesRef] = useState()
  const [selectedType, setSelectedType, selectedTypeRef] = useState();
  const [nombreCaracteristica, setNombreCaracteristica, nombreCaracteristicaRef] = useState()
  const [placeholderR, setPlaceholderR, placeholderRRef] = useState()
  const [isRequired, setIsRequired, isRequiredRef] = useState(0)
  const [selectValues, setSelectValues, selectValuesRef] = useState()
  const [lastLevel, setLastLevel, lastLevelRef] = useState()


  const AuthStore = useAuthState();

  useEffect(() => {
    getAllTypes()
    getItems()
  }, [])


  const addItem = async () => {
    try {
      setLoading(true)
      const response = await fetch(process.env.REACT_APP_HOME + "category", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "DescripcionCategoria": categoria })
      })
      setCategoria("")
      await getItems()
      setShowModal(false)
      setLoading(false)
      alert("La categoria se guardo exitosamente")
    } catch (error) {
      alert("Ocurrio un error al guardar la categoria")
    }
  }

  const getItems = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "category/table", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const result = await response.json()
      setlistCat(result)
      setLoading(false)
      //console.log(result)
      //setlistCat(response)
      // console.log(result)
    } catch (error) {
      console.log(error)
      alert("Ocurrio un error al obtener las categorias " + error)
    }
  }

  const getAllTypes = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "machines/types", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const result = await response.json()
      setTypes(result)
    } catch (error) {
      console.log(error)
      alert("Ocurrio un error al obtener los tipos de datos " + error)
    }
  }

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

  const changeEntityStatus = async (key, action) => {
    setKeyEdit(key);
    await getLastLevelByEntity();
    if (action == "UPD") {
      await getEntityInfoRaw();
      setModalActualizar(true);
    }
    if (action == "STA") {
      setModalCancel(true);
    }
  }

  const handleEntityStatus = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "category/changestatus/" + keyEditRef.current, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const result = await response.json()
      window.location.reload()
    } catch (error) {
      console.log(error)
      alert("Ocurrio un error al cambiar el estado de la entidad " + error)
    }
  }

  const getEntityInfoRaw = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "category/update/" + keyEditRef.current, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const result = await response.json()
      setInfoRaw(result)
      console.log(infoRawRef.current)
    } catch (error) {
      console.log(error)
      alert("Ocurrio un error al obtener la entidad " + error)
    }
  }

  const handleCaracteristicaNameChange = (e) => {
    var auxArray = [...infoRaw];
    auxArray[e.target.id].CaracteristicaDescripcion = e.target.value;
    setInfoRaw(auxArray);
  }

  const handlePlaceholderChange = (e) => {
    var auxArray = [...infoRaw];
    auxArray[e.target.id].Placeholder = e.target.value;
    setInfoRaw(auxArray);
  }

  const handleIsRequiredItem = (e) => {
    var auxArray = [...infoRaw];
    var value = auxArray[e.target.id].Requerido.data[0];
    //if(e.target.value == 0) value = 1; else value = 0;
    if (value == 0) value = 1; else value = 0;
    auxArray[e.target.id].Requerido.data[0] = value;
    setInfoRaw(auxArray);
    console.log(infoRawRef.current)
  }

  const handleNewItemsChange = async (e) => {
    setItemsSelect(e.target.id)
    await getItemsByRow();
    setItemsModal(true)
  }

  const getItemsByRow = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "category/items/" + keyEditRef.current, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const result = await response.json()
      setItems(result)
    } catch (error) {
      console.log(error)
      alert("Ocurrio un error al obtener las categorias " + error)
    }
  }

  const updateCaracteristicaInfo = async (index) => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "category/update/" + keyEditRef.current, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          CaracteristicaDescripcion: infoRawRef.current[index].CaracteristicaDescripcion,
          Placeholder: infoRawRef.current[index].Placeholder,
          Requerido: infoRawRef.current[index].Requerido.data[0],
          IdCaracteristica: infoRawRef.current[index].IdCaracteristica
        })
      })
      const result = await response.json()
      console.log(result)
    } catch (error) {
      console.log(error)
      //alert("Ocurrio un error al obtener la entidad " + error)
    }
  }

  const handleUpdateEntity = async (e) => {
    try {
      infoRawRef.current.forEach((item, index) => {
        updateCaracteristicaInfo(index);
      })
      alert("Datos actualizados exitosamente")
      window.location.reload()
    } catch (error) {
      console.log(error)
      alert("Ocurrio un error al actualizar la entidad " + error)
    }
  }

  const saveNewItem = async (e) => {
    if (newItemsRef.current.length < 1) return alert("El campo no puede estar vacio");
    try {
      const lastLevel = parseInt(itemsRef.current?.filter(x => x.IdCaracteristica == itemsSelectRef.current)[0].MaxNivel) + 1;
      const response = await fetch(process.env.REACT_APP_HOME + "category/items/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          IdCategoria: keyEditRef.current,
          IdCaracteristica: itemsSelectRef.current,
          OpcionDescripcion: newItemsRef.current,
          Nivel: lastLevel
        })
      })
      const result = await response.json()
      console.log(result)
      alert("Item guardado exitosamente")
      window.location.reload()
      //window.location.reload()
    } catch (error) {
      console.log(error)
      alert("Ocurrio un error al guardar la entidad " + error)
    }
  }

  const handleChangeItemsState = async (e) => {
    var auxArray = [...items];
    console.log(auxArray)
    var value = auxArray[e.target.id].Estado.data[0];
    console.log(value)
    if (value == 0) value = 1; else value = 0;
    auxArray[e.target.id].Estado.data[0] = value;
    setItems(auxArray);
  }

  const handleChangeItemsName = async (e) => {
    var auxArray = [...items];
    var id = e.target.id;
    auxArray.filter(x => x.IdCaracteristica == itemsSelectRef.current)[e.target.id].OpcionDescripcion = e.target.value;
    setItems(auxArray);
  }

  const updateAllMyItems = async (e) => {
    try {
      itemsRef.current.forEach((item, index) => {
        updateItems(index);
      })
      alert("Datos actualizados exitosamente")
      window.location.reload()
    } catch (error) {
      console.log(error)
      alert("Ocurrio un error al actualizar la entidad " + error)
    }
  }

  const updateItems = async (index) => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "category/updateitems", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Estado: itemsRef.current[index].Estado.data[0],
          OpcionDescripcion: itemsRef.current[index].OpcionDescripcion,
          IdCategoria: keyEditRef.current,
          IdCaracteristica: itemsSelectRef.current,
          IdOpcion: itemsRef.current[index].IdOpcion
        })
      })
      const result = await response.json()
      console.log(result)
    } catch (error) {
      console.log(error)
      //alert("Ocurrio un error al obtener la entidad " + error)
    }
  }

  const handleRequiredNewItem = (e) => {
    if(e.target.value == "on"){
      setIsRequired(1);
    }else{
      setIsRequired(0);
    }
  }

  const getLastLevelByEntity = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "control/lastlevel/" + keyEditRef.current, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const result = await response.json()
      console.log("RESULTADO O.O")
      console.log(result)
      setLastLevel(result[0].LastNivel)
    } catch (error) {
      console.log(error)
      alert("Ocurrio un error al obtener las categorias " + error)
    }
  }

  const addCaracteristica = async () => {
    try {
      
      const response = await fetch(process.env.REACT_APP_HOME + "control", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          "IdCategoria": keyEditRef.current,
          "CaracteristicaDescripcion": nombreCaracteristicaRef.current,
          "Estado": 1,
          "Nivel" : parseInt(lastLevelRef.current) + 1,
          "Requerido" : isRequiredRef.current,
          "Placeholder" : placeholderRRef.current,
          "Tooltip": nombreCaracteristicaRef.current,
          "UsuarioCreo": AuthStore.me.get().username,
          "CaracteristicaTipo": selectedTypeRef.current
        })
      })
      alert("La categoria se guardo exitosamente")
      const result = await response.json()
      console.log(result)
      //window.location.reload()
    } catch (error) {
      alert("Ocurrio un error al guardar la categoria")
    }
  }

  //const

  return (
    <>
      {
        loading ? <></> :
          <>
            <NavigationWindow />
            <NavPageContainer
              hasPadding={true}
              animateTransition={true}>


              <Modal showOverlay={true} show={modalCancel} onClose={() => setModalCancel(false)}>
                <Modal.Header>
                  <Modal.Title>Cambiar estado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div style={{ display: 'flex' }}>
                    <i className="icons10-exclamation-mark" style={{ color: '#faca2a', fontSize: "70px" }} />
                    <div style={{ marginLeft: 25, justifyContent: "center", alignItems: "center", display: "flex" }}>
                      <label>Estás a punto de cambiar el estado de esta entidad, ¿estás seguro(a) que deseas continuar?</label>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button value='Si, cambiar estado' onClick={() => { handleEntityStatus() }} />
                  <Button value="No, mantener estado actual" onClick={() => setModalCancel(false)} />
                </Modal.Footer>
              </Modal>

              <Modal showOverlay={true} show={modalNew} onClose={() => setModalNew(false)} size={"md"}>
                <Modal.Header>
                  <Modal.Title>Nueva Caracteristica</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div style={{ display: 'flex', flex: 1 }}>
                    <table style={{ width: '100%' }} className="styled-table" id="table-products">
                      <thead>
                        <tr>
                          <th>Elemento</th>
                          <th>Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <p>Nombre de la Caracteristica</p>
                          </td>
                          <td>
                            <input type="text" className='app-input-text' placeholder='Nombre de la caracteristica' value={nombreCaracteristica} onChange={(e)=> setNombreCaracteristica(e.target.value)}/>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Placeholder</p>
                          </td>
                          <td>
                            <input type="text" className='app-input-text' placeholder='Nombre de la caracteristica' value={placeholderR} onChange={(e)=> setPlaceholderR(e.target.value)}/>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Tipo</p>
                          </td>
                          <td>
                          <Select
                              options={typesRef.current}
                              onChange={(e) => setSelectedType(e.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>
                              Opciones (separadas por barra |)
                            </p>
                          </td>
                          <td>
                            <input type="text" className='app-input-text' placeholder='Item 1|Item2|Item3' value={selectValues} onChange={(e)=> setSelectValues(e.target.value)} disabled={selectedTypeRef.current == 4 ? false : true}/>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>
                              ¿Es requerido?
                            </p>
                          </td>
                          <td>
                            <div style={{display: "flex", justifyContent: "center"}}>
                            <input type="checkbox" placeholder='Nombre de la caracteristica' onChange={handleRequiredNewItem}/>
                            </div>  
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button value='Guardar nuevo campo' onClick={addCaracteristica} />
                  <Button value="Cancelar" onClick={() => setModalNew(false)} />
                </Modal.Footer>
              </Modal>

              <Modal showOverlay={true} show={modalActualizar} onClose={() => setModalActualizar(false)}>
                <Modal.Header>
                  <Modal.Title>Actualizar entidad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div style={{ display: 'flex' }}>
                    {/* <i className="icons10-info" style={{ color: '#faca2a', fontSize: "50px" }} /> */}
                    <div style={{ marginRight: 25, flex: 1 }}>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                        <button className="app-button animate primary" onClick={() => setModalNew(true)}>Nuevo campo</button>
                      </div>
                      <div>
                        <table style={{ width: '100%' }} className="styled-table" id="table-products">
                          <thead>
                            <tr>
                              <th>Caracteristica</th>
                              <th>Placeholder</th>
                              <th>Tipo</th>
                              <th>Requerido</th>
                              <th>Valores</th>
                              <th>Nuevos Items</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              infoRaw ? infoRawRef.current?.map((item, index) => {

                                return (
                                  <tr>
                                    <td>
                                      <input type="text" className='app-input-text' id={index} value={infoRawRef.current[index].CaracteristicaDescripcion} onChange={handleCaracteristicaNameChange} />
                                    </td>
                                    <td>
                                      <input type="text" className='app-input-text' id={index} value={infoRawRef.current[index].Placeholder} onChange={handlePlaceholderChange} />
                                    </td>
                                    <td>
                                      {infoRawRef.current[index].DisplayText}
                                    </td>
                                    <td>{
                                      infoRawRef.current[index].Requerido.data[0] === 1 ?
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                          <input type="checkbox" id={index} checked onChange={handleIsRequiredItem} />
                                        </div>
                                        :
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                          <input type="checkbox" id={index} onChange={handleIsRequiredItem} />
                                        </div>
                                    }

                                    </td>
                                    <td>
                                      {infoRawRef.current[index].Campos}
                                    </td>
                                    <td>
                                      {
                                        infoRawRef.current[index].DescripcionTipo === "select" ?
                                          <button className='app-button animate primary' style={{ marginRight: "10px" }} id={item.IdCaracteristica} onClick={handleNewItemsChange}>Actualizar items</button>
                                          :
                                          <p>N/A</p>
                                      }

                                    </td>
                                  </tr>
                                )
                              }) : <></>
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <Modal showOverlay={true} show={itemsModal} size={"lg"}>
                      <Modal.Header>
                        <Modal.Title>Actualizacion de ítems</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
                          <button className="app-button animate primary" onClick={() => setModalCategory(true)}>Nuevo item</button>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <table style={{ width: '100%' }} className="styled-table" id="table-products">
                            <thead>
                              <tr>
                                <th>Item</th>
                                <th>Estado</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                itemsRef.current?.filter(x => x.IdCaracteristica == itemsSelectRef.current).map((item, index) => {
                                  return (
                                    <tr>
                                      <td> <input className='app-input-text' type="text" id={index} value={itemsRef.current.filter(x => x.IdCaracteristica == itemsSelectRef.current)[index].OpcionDescripcion} onChange={handleChangeItemsName} /></td>
                                      {
                                        <td style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                          {
                                            itemsRef.current[index].Estado.data[0] == 1 ?
                                              <input type="checkbox" checked id={index} onChange={handleChangeItemsState} /> :
                                              <input type="checkbox" id={index} onChange={handleChangeItemsState} />
                                          }
                                        </td>
                                      }
                                    </tr>
                                  )
                                })
                              }
                            </tbody>
                          </table>
                        </div>


                        <Modal showOverlay={true} show={modalCategory} size={"xs"} onClose={() => setModalCategory(false)}>
                          <Modal.Header>
                            <Modal.Title>Nuevo Item</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <p>Ingrese el valor del nuevo item</p>
                            <input className='app-input-text' placeholder='Nuevo item' value={newItems} onChange={(e) => setNewItems(e.target.value)} />
                          </Modal.Body>
                          <Modal.Footer>
                            <Button value='Agregar item' onClick={() => { saveNewItem() }} />
                            <Button value="Cancelar" onClick={() => setModalCategory(false)} />
                          </Modal.Footer>
                        </Modal>



                      </Modal.Body>
                      <Modal.Footer>
                        <Button value='Actualizar items' onClick={updateAllMyItems} />
                        <Button value="Cancelar" onClick={() => setItemsModal(false)} />
                      </Modal.Footer>
                    </Modal>


                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button className='app-button animate primary' style={{ marginRight: "10px" }} onClick={() => handleUpdateEntity()}>Actualizar</button>
                  <button className='app-button animate primary' style={{ marginRight: "10px" }} onClick={() => setModalActualizar(false)} >Cancelar</button>
                </Modal.Footer>
              </Modal>
              <h1>Entidades</h1>
              <p>Añada, modifique o elimine sus entidades</p>
              <div className="app-hr"></div>
              <div style={{ marginTop: "15px" }}>
                <label>Buscar</label>
                <input className='app-input-text' id="search-input-table" placeholder='Buscar...' style={{ marginLeft: "20px" }} onKeyUp={searchTableAll} />
              </div>
              <div style={{ display: "flex", flex: 1, marginRight: "30px" }}>
                <table style={{ width: '100%' }} className="styled-table" id="table-products">
                  <thead>
                    <tr>
                      <th>Entidad</th>
                      <th>Estado</th>
                      <th>Fecha de Creación</th>
                      <th>Grupo</th>
                      <th>Creada por</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      listCatRef?.current?.map(item => {
                        return (
                          <tr>
                            <td>{item.DescripcionCategoria}</td>
                            <td>{item.EstadoCategoria == "Activo" ? <span style={{ color: "green" }}>■</span> : <span style={{ color: "red" }}>■</span>} {item.EstadoCategoria}</td>
                            <td>{item.FechaCreacion}</td>
                            <td>{item.DescripcionGrupo}</td>
                            <td>{item.UsuarioCreo}</td>
                            <td>
                              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <button className='app-button animate primary' style={{ marginRight: "10px" }} onClick={() => changeEntityStatus(item.IdCategoria, "STA")}>Cambiar estado</button>
                                <button className='app-button animate primary' style={{ marginRight: "10px" }} onClick={() => changeEntityStatus(item.IdCategoria, "UPD")}>Actualizar</button>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
              <Dialog
                isVisible={showModal}
                onBackdropPress={() => setShowModal(false)}
                showDropShadow={true}>
                <div style={{ padding: '10px' }}>
                  <h3>Nueva Categoría</h3>
                  <div className="app-hr"></div>
                  <div >
                    <p>Nombre de la categoria: </p>
                    <input
                      value={categoria}
                      onChange={e => setCategoria(e.target.value)}
                    />
                    <Button
                      style={{ marginLeft: '30px' }}
                      value="Guardar"
                      onClick={addItem}
                      icon={<i className="icons10-save"></i>} />
                  </div>
                </div>
              </Dialog>
            </NavPageContainer>
          </>
      }
    </>
  );
}

export default Categoria