
import { NavPageContainer } from 'react-windows-ui'
import React, { useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import { Dialog, Button } from 'react-windows-ui'
import MaterialTable from 'material-table'
import "../empleados/index.css"
import Select from 'react-select'
import Modal from '../../components/Modal';
import useState from 'react-usestateref'


const Empleado = () => {



  const [listEmployee, setListEmployees, listEmployeeRef] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalCancel, setModalCancel] = useState(false)
  const [modalActualizar, setModalActualizar] = useState(false)
  const [keyEdit, setKeyEdit, keyEditRef] = useState()
  const [areas, setAreas] = useState();
  const [cities, setCities] = useState();
  const [selectedCity, setSelectedCity, selectedCityRef] = useState();
  const [selectedArea, setSelectedArea, selectedAreaRef] = useState();
  const [selectedSucursal, setSelectedSucursal, selectedSucursalRef] = useState();
  const [defaultArea, setDefaultArea, defaultAreaRef] = useState();
  const [defaultCity, setDefaultCity, defaultCityRef] = useState();
  const [defaultSucursal, setDefaultSucursal, defaultSucursalRef] = useState();
  const [allSucursales, setAllSucursales, allSucursalesRef] = useState();
  const [sucursales, setSucursales, sucursalesRef] = useState()
  const [modalAdd, setModalAdd] = useState(false)
  const [employeeName, setEmployeeName, employeeRefName] = useState()
  const [employeeEmail, setEmployeeEmail, employeeRefEmail] = useState()

  let enumList = []


  const columnas = [
    {
      title: 'Id',
      field: 'id',
      hidden: true
    },
    {
      title: 'Empleado',
      field: 'empleado'
    },
    {
      title: 'Area',
      field: 'area'
    }

  ]

  useEffect(() => {
    getEmployeesData()
    getCities()
    getAllSucursales()
    getAreas()
  }, [])

  const addItem = async () => {
      if (employeeName && selectedArea && selectedSucursal) {
        if (validarEmail(employeeEmail)) {
        try {
          setLoading(true)
          const response = await fetch(process.env.REACT_APP_HOME + "employee", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "NombreEmpleado": employeeRefName.current, "IdArea": selectedArea, "Email": employeeRefEmail.current, "IdSucursal": selectedSucursal })
          })
          alert("El empleado se guardó exitosamente")
          window.location.reload()
        } catch (error) {
          alert("Ocurrio un error al guardar el empleado")
        }
      } 
    }else {
      alert("Asegúrate de llenar todos los datos.")
    }
  }

  const validarEmail = (valor) => {
    if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(valor)) {
      return true;
    } else {
      alert("La dirección de email es incorrecta.");
      return false;
    }
  }

  const getEmployeesData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "employee", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const result = await response.json()
      setListEmployees(result)
      /*setLoading(false)*/
      // setLoading(true)
      //console.log(result)
      //setListEmployees(response)

    } catch (error) {
      console.log(error)
    }
  }

  const getAreas = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "area", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const result = await response.json()
      var arre = []
      result.forEach(ele => {
        var obj = {
          value: ele.IdArea,
          label: ele.DescripcionArea
        }
        arre.push(obj)
        console.log(obj)
      })
      setAreas(arre)
      setLoading(false)

    } catch (error) {
      console.log(error)
    }
  }

  const getAllSucursales = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "sucursales/all", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json()
      var arre = []
      result.forEach(ele => {
        var obj = {
          value: ele.IdSucursal,
          label: ele.NombreSucursal
        }
        arre.push(obj)
        console.log(obj)
      })
      setAllSucursales(arre)
    } catch (error) {
      console.log(error)
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

  const handleEntityStatus = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "employee/changestatus/" + keyEditRef.current, {
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

  const handleChangeStatus = async (e) => {
    setModalCancel(true);
    setKeyEdit(e.target.id);
  }

  const handleActualizarStatus = async (e) => {
    setModalActualizar(true);
    setKeyEdit(e.target.id);
    var objArea = {
      value: listEmployeeRef.current.filter(x => x.IdEmpleado == e.target.id)[0].IdArea,
      label: listEmployeeRef.current.filter(x => x.IdEmpleado == e.target.id)[0].DescripcionArea
    }
    setDefaultArea(objArea);
    setSelectedArea(objArea.value);
    var objCity = {
      value: listEmployeeRef.current.filter(x => x.IdEmpleado == e.target.id)[0].IdCiudad,
      label: listEmployeeRef.current.filter(x => x.IdEmpleado == e.target.id)[0].NombreCiudad
    }
    setDefaultCity(objCity);
    setSelectedCity(objCity.value);
    var objSucursal = {
      value: listEmployeeRef.current.filter(x => x.IdEmpleado == e.target.id)[0].IdSucursal,
      label: listEmployeeRef.current.filter(x => x.IdEmpleado == e.target.id)[0].NombreSucursal
    }
    setDefaultSucursal(objSucursal);
    setSelectedSucursal(objSucursal.value);
  }

  const getCities = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "city", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json()
      var arre = []
      result.forEach(ele => {
        var obj = {
          value: ele.IdCiudad,
          label: ele.NombreCiudad
        }
        arre.push(obj)
      })
      setCities(arre)
    } catch (error) {
      console.log(error)
    }
  }

  const getSucursalesByCity = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "sucursales/" + selectedCityRef.current, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json()
      var arre = []
      result.forEach(ele => {
        var obj = {
          value: ele.IdSucursal,
          label: ele.NombreSucursal
        }
        arre.push(obj)
      })
      setSucursales(arre)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateEmployee = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "employee/" + keyEditRef.current, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          NombreEmpleado: listEmployeeRef.current.filter(x => x.IdEmpleado == keyEditRef.current)[0].NombreEmpleado,
          Email: listEmployeeRef.current.filter(x => x.IdEmpleado == keyEditRef.current)[0].Email,
          IdArea: selectedAreaRef.current,
          IdCiudad: selectedCityRef.current,
          IdSucursal: selectedSucursalRef.current,
          EstadoEmpleado: listEmployeeRef.current.filter(x => x.IdEmpleado == keyEditRef.current)[0].EstadoEmpleado.data[0]
        })
      })

      const result = await response.json()
      console.log(result)
      alert("Empleado actualizado exitosamente")
      window.location.reload()
    } catch (error) {
      console.log(error)
      alert("Ocurrio un error al actualizar el empleado " + error)
    }
  }

  const handleInputNameChange = async (e) => {
    var auxArray = [...listEmployee];
    auxArray[e.target.id].NombreEmpleado = e.target.value;
    setListEmployees(auxArray);
  }

  const handleInputEmailChange = async (e) => {
    var auxArray = [...listEmployee];
    auxArray[e.target.id].Email = e.target.value;
    setListEmployees(auxArray);
  }

  const handleInputEstadoChange = async (e) => {
    var auxArray = [...listEmployee];
    var value = listEmployeeRef.current[e.target.id]?.EstadoEmpleado?.data[0];
    if (value == 0) value = 1; else value = 0;
    auxArray[e.target.id].EstadoEmpleado.data[0] = value;
    setListEmployees(auxArray);
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

              <Modal showOverlay={true} show={modalCancel} onClose={() => setModalCancel(false)}>
                <Modal.Header>
                  <Modal.Title>Cambiar estado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div style={{ display: 'flex' }}>
                    <i className="icons10-exclamation-mark" style={{ color: '#faca2a', fontSize: "70px" }} />
                    <div style={{ marginLeft: 25, justifyContent: "center", alignItems: "center", display: "flex" }}>
                      <label>Estás a punto de cambiar el estado de este empleado, ¿estás seguro(a) que deseas continuar?</label>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button value='Si, cambiar estado' onClick={handleEntityStatus} />
                  <Button value="No, mantener estado actual" onClick={() => setModalCancel(false)} />
                </Modal.Footer>
              </Modal>

              <Modal showOverlay={true} show={modalActualizar} onClose={() => setModalActualizar(false)} size={"md"}>
                <Modal.Header>
                  <Modal.Title>Actualizar Empleado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div style={{ display: 'flex', flex: 1 }}>
                    <table style={{ width: '100%' }} className="styled-table" id="table-products">
                      <thead>
                        <tr>
                          <th>Caracteristica</th>
                          <th>Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          listEmployeeRef.current.map((item, index) => {
                            if (item.IdEmpleado == keyEditRef.current) {
                              return (
                                <>
                                  <tr>
                                    <td>Nombre del Empleado</td>
                                    <td>
                                      <input className='app-input-text' onChange={handleInputNameChange} type="text" id={index} value={listEmployeeRef.current[index].NombreEmpleado} />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Correo electrónico</td>
                                    <td>
                                      <input className='app-input-text' onChange={handleInputEmailChange} type="email" id={index} value={listEmployeeRef.current[index].Email} />
                                    </td>
                                  </tr><tr>
                                    <td>Área</td>
                                    <td>
                                      <Select
                                        options={areas}
                                        defaultValue={defaultAreaRef.current}
                                        onChange={(e) => setSelectedArea(e.value)}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Ciudad</td>
                                    <td>
                                      <Select
                                        options={cities}
                                        defaultValue={defaultCityRef.current}
                                        onChange={(e) => { setSelectedCity(e.value); getSucursalesByCity(); }}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Sucursal</td>
                                    <td>
                                      <Select
                                        options={sucursalesRef.current}
                                        defaultValue={defaultSucursalRef.current}
                                        // value={sucursalesRef.current[0]}
                                        onChange={(e) => setSelectedSucursal(e.value)}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Estado</td>
                                    <td>
                                      {
                                        listEmployeeRef.current[index].EstadoEmpleado.data[0] === 1 ?
                                          <div style={{ display: "flex", justifyContent: "center" }}>
                                            <input type="checkbox" id={index} checked style={{ marginRight: "10px" }} onChange={handleInputEstadoChange} />
                                            <span> ACTIVO</span>
                                          </div>
                                          :
                                          <div style={{ display: "flex", justifyContent: "center" }}>
                                            <input type="checkbox" id={index} style={{ marginRight: "10px" }} onChange={handleInputEstadoChange} />
                                            <span> INACTIVO</span>
                                          </div>
                                      }
                                    </td>
                                  </tr>
                                </>
                              )
                            }
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button value='Actualizar' onClick={handleUpdateEmployee} />
                  <Button value="Cancelar" onClick={() => setModalActualizar(false)} />
                </Modal.Footer>
              </Modal>

              <Modal showOverlay={true} show={modalAdd} onClose={() => setModalAdd(false)} size={"sm"}>
                <Modal.Header>
                  <Modal.Title>Nuevo Empleado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div style={{ display: 'flex', flex: 1 }}>
                    <table style={{ width: '100%' }} className="styled-table" id="table-products">
                      <thead>
                        <tr>
                          <th>Caracteristica</th>
                          <th>Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            Nombre del Empleado
                          </td>
                          <td>
                            <input className='app-input-text' type="text" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} required />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Email
                          </td>
                          <td>
                            <input className='app-input-text' type="email" value={employeeEmail} onChange={(e) => setEmployeeEmail(e.target.value)} />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Área
                          </td>
                          <td>
                            <Select
                              options={areas}
                              onChange={(e) => setSelectedArea(e.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Sucursal
                          </td>
                          <td>
                            <Select
                              options={allSucursales}
                              onChange={(e) => setSelectedSucursal(e.value)}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button value='Agregar' onClick={addItem} />
                  <Button value="Cancelar" onClick={() => setModalAdd(false)} />
                </Modal.Footer>
              </Modal>

              <h1>Empleados</h1>
              <p>Añada, modifique o elimine registros de empleados.</p>
              <div className="app-hr"></div>

              <div style={{ margin: '20px 0' }}>
              </div>
              <div style={{ display: "flex", flex: 1, marginRight: "30px", flexDirection: "column" }}>
                <div style={{ marginTop: "15px", display: "flex", flex: 1 }}>
                  <div style={{ flex: 1 }}>
                    <label>Buscar</label>
                    <input className='app-input-text' id="search-input-table" placeholder='Buscar...' style={{ marginLeft: "20px" }} onKeyUp={searchTableAll} />
                  </div>
                  <div style={{ flex: 1, justifyContent: "flex-end", display: "flex" }}>
                    <button className="app-button animate primary" onClick={() => setModalAdd(true)}>Nuevo empleado</button>
                  </div>
                </div>
                <table style={{ width: '100%' }} className="styled-table" id="table-products">
                  <thead>
                    <tr>
                      <th>Nombre del Empleado</th>
                      <th>Correo electrónico</th>
                      <th>Área</th>
                      <th>Sucursal</th>
                      <th>Ciudad</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      listEmployee ?
                        listEmployeeRef.current.map((ele, index) => {
                          return (
                            <tr>
                              <td>{ele.NombreEmpleado}</td>
                              <td>{ele.Email}</td>
                              <td>{ele.DescripcionArea}</td>
                              <td>{ele.NombreSucursal}</td>
                              <td>{ele.NombreCiudad}</td>
                              <td>{ele.EstadoEmpleado.data[0] == 1 ? <><span style={{ color: "green" }}>■ </span><span>ACTIVO</span></> : <><span style={{ color: "red" }}>■ </span><span>INACTIVO</span></>}</td>
                              <td style={{ display: "flex", justifyContent: "center" }}>
                                <button className='app-button animate primary' id={ele.IdEmpleado} style={{ marginRight: "10px" }} onClick={handleChangeStatus}>Cambiar estado</button>
                                <button className='app-button animate primary' id={ele.IdEmpleado} style={{ marginRight: "10px" }} onClick={handleActualizarStatus}>Actualizar información</button>
                              </td>
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

export default Empleado