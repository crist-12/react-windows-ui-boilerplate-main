
import { NavPageContainer, Link, InputText, NavPageContainerRight, LinkCompound, Button } from 'react-windows-ui'
import React, { useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import RightMenu from '../../components/RightMenu'
import Select from 'react-select';
import { useMasterState } from '../../stores/MasterStore'
import { useAuthState } from '../../stores/AuthStore';
import useState from 'react-usestateref'
import Modal from '../../components/Modal';
import '@trendmicro/react-modal/dist/react-modal.css';

const Asignar = () => {

  const masterState = useMasterState();
  const authState = useAuthState();

  const [controls, setControls] = React.useState([]);
  const [loading, setLoading] = React.useState(true)
  const [computadoras, setComputadoras] = React.useState([]);
  const [employeeDatos, setEmployeeDatos] = React.useState([])
  const [employee, setEmployee] = React.useState(null);
  const [selectedComputadora, setSelectedComputadora, selectedComputadoraRef] = useState(null);
  const [selectedDataPC, setSelectedDataPC, selectedDataPCRef] = useState(null);
  const [statusComputadora, setStatusComputadora, statusComputadoraRef] = useState(null);
  const [selectedEmployee, setSelectedEmployee, selectedEmployeeRef] = useState(null);
  const [filteredComputer, setFilteredComputer, filteredComputerRef] = useState(null);
  const [filteredEmployee, setFilteredEmployee, filteredEmployeeRef] = useState(null);
  const [disableEmployee, setDisableEmployee, disableEmployeeRef] = useState(false);
  const [modalAsi, setModalAsi] = React.useState(false);

  const [detallesAsi, setDetallesAsi, detallesAsiRef] = useState("");
  const [incluyeMochila, setIncluyeMochila, incluyeMochilaRef] = useState(false);
  const [incluyeMouse, setIncluyeMouse, incluyeMouseRef] = useState(false);
  const [incluyeTeclado, setIncluyeTeclado, incluyeTecladoRef] = useState(false);
  const [incluyeCargador, setIncluyeCargador, incluyeCargadorRef] = useState(false);
  const [incluyeWebcam, setIncluyeWebcam, incluyeWebcamRef] = useState(false);


  useEffect(() => {
    getAllComputersRegistered()
    getAllEmployeeDetails()
  }, [])

  const getControls = async () => {
    try {
      const response = await fetch("http://localhost:9000/control", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const result = await response.json()
      var arre = []
      result.forEach(ele => {
        var obj = {
          label: ele.CaracteristicaDescripcion,
          type: ele.DescripcionTipo,
          placeholder: "Ingrese " + ele.CaracteristicaDescripcion,
          tooltip: ele.CaracteristicaDescripcion
        }
        arre.push(obj)
      })
      console.log(arre)
      setControls(arre)
      setLoading(false)

      console.log(controls)

    } catch (error) {
      console.log(error)
    }
  }

  const getAllComputersRegistered = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "control/equipos", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json()
      var arrayComputadoras = []
      result.forEach(ele => {
        var objComputadora = {
          label: "",
          value: ""
        }
        objComputadora.value = ele.IdEquipo;
        switch (ele.DescripcionEstado) {
          case "Asignada":
            objComputadora.label = ele.Equipo + " 🟢";
            break;
          case "En mantenimiento":
            objComputadora.label = ele.Equipo + " 🟡";
            break;
          case "No disponible":
            objComputadora.label = ele.Equipo + " 🔴";
            break;
          case "Sin asignar":
            objComputadora.label = ele.Equipo + " 🔵";
            break;
        }
        arrayComputadoras.push(objComputadora)
      })
    } catch (error) {
      console.log(error)
    }
    setComputadoras(arrayComputadoras)
    // setLoading(false)
  }

  const handleChangeComputadora = async (e) => {
    //var auxArray = [];
    //auxArray = computadoras.filter(ele => ele.value == e.value)
    setSelectedComputadora(e.value)
    console.log(e)
    var label = e.label
    var label2 = label.substring(0, label.length - 1);
    setSelectedDataPC(label.slice(0, -2))
    await getComputerDetails(e.value)
    await checkComputerStatus()

  }

  const handleChangeEmployee = async (e) => {
    var label = e.label
    setFilteredEmployee(label)
    setSelectedEmployee(e.value)
  }

  const getAllEmployeeDetails = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "employee/details", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json()
      var arrayEmpleados = []
      var arraySelect = []
      result.forEach(ele => {
        var objEmpleados = {
          label: ele.NombreEmpleado,
          value: ele.IdEmpleado,
          area: ele.DescripcionArea,
          sucursal: ele.NombreSucursal,
          ciudad: ele.NombreCiudad
        }
        //  objEmpleados.value = ele.IdEquipo;
        var obj = {
          label: ele.NombreEmpleado,
          value: ele.IdEmpleado
        }
        arrayEmpleados.push(objEmpleados)
        arraySelect.push(obj)
      })
    } catch (error) {
      console.log(error)
    }
    setEmployeeDatos(arraySelect)
    setEmployee(arrayEmpleados)
    setLoading(false)
  }

  const getComputerDetails = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "machines/" + selectedComputadoraRef.current, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json()
      setFilteredComputer(result);
      console.log(result)
    } catch (error) {
      alert(error)
    }
  }

  const checkComputerStatus = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "assignment/status/" + selectedComputadoraRef.current, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json()
      console.warn(result)
      setStatusComputadora(result[0]);
      if (result[0].TipoEstado == 1) {
        setDisableEmployee(false)
      } else {
        setDisableEmployee(true)
      }
      //console.log(result)
    } catch (error) {
      alert(error)
    }
  }

  const changeComputerStatus = async (status) => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "machines/status/" + selectedComputadoraRef.current, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          TipoEstado: status
        })
      })
      const result = await response.json()
      console.log(result)
      alert("Cambio de estado exitoso")
    } catch (error) {
      alert(error)
    }
  }

  const handleShowAsiModal = () => {
    if (filteredEmployeeRef.current) {
      setModalAsi(true)
    } else {
      return alert("Debes seleccionar un empleado para asignar el equipo")
    }
  }

  return (
    <>
      {
        loading ? <></> :
          <>
            <NavigationWindow />
            <Modal showOverlay={true} show={modalAsi} onClose={() => setModalAsi(false)} size="lg">
              <Modal.Header>
                <Modal.Title>Asignación de Computadora</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div style={{ display: 'flex' }}>
                  {/* <i className="icons10-info" style={{ color: '#faca2a', fontSize: "50px" }} /> */}
                  <div style={{ marginRight: 25, flex: 1 }}>
                    <p>Datos Generales de Asignación</p>
                    <div className='app-hr' />
                    <p>COMPUTADORA: {selectedDataPCRef.current} </p>
                    <p>EMPLEADO: {filteredEmployeeRef.current}</p>
                    <p>FECHA DE ASIGNACIÓN: {new Date().toLocaleDateString()}</p>
                    <p>ASIGNADO POR: {authState.me.get().username}</p>
                  </div>
                  <div style={{ flex: 1, justifyContent: "center", display: "flex", flexDirection: "column" }}>
                    <div style={{ margin: "10px 0px", justifyContent: "center" }}>
                      <label className='app-checkbox'>
                        <input type="checkbox" style={{ marginRight: "10px" }} checked={incluyeMochila} onChange={(e) => setIncluyeMochila(e.target.checked)} />
                        Incluye Mochila
                      </label>
                    </div>
                    <div style={{ margin: "10px 0px" }}>
                      <label className='app-checkbox'>
                        <input type="checkbox" style={{ marginRight: "10px" }} checked={incluyeCargador} onChange={(e) => setIncluyeCargador(e.target.checked)} />
                        Incluye Cargador
                      </label>
                    </div>
                    <div style={{ margin: "10px 0px" }}>
                      <label className='app-checkbox'>
                        <input type="checkbox" style={{ marginRight: "10px" }} checked={incluyeMouse} onChange={(e) => setIncluyeMouse(e.target.checked)} />
                        Incluye Mouse
                      </label>
                    </div>
                    <div style={{ margin: "10px 0px" }}>
                      <label className='app-checkbox'>
                        <input type="checkbox" style={{ marginRight: "10px" }} checked={incluyeTeclado} onChange={(e) => setIncluyeTeclado(e.target.checked)} />
                        Incluye Teclado Numérico
                      </label>
                    </div>
                    <div style={{ margin: "10px 0px" }}>
                      <label className='app-checkbox'>
                      <input type="checkbox" style={{ marginRight: "10px" }} checked={incluyeWebcam} onChange={(e)=> setIncluyeWebcam(e.target.checked)}/>
                        Incluye WebCam
                      </label>
                    </div>

                  </div>

                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ flex: 1, width: "100%" }}>
                    <p>Detalles de la asignacion</p>
                    <div className='app-hr' />
                    <textarea className="app-textarea" style={{ width: "100%", resize: "none" }} />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button className='app-button animate primary' style={{ marginRight: "10px" }}>Asignar</button>
                <button className='app-button animate primary' style={{ marginRight: "10px" }}>Cancelar</button>
              </Modal.Footer>
            </Modal>
            <NavPageContainer
              hasPadding={true}
              animateTransition={true}>

              <h1>Asignar</h1>
              <p>Asigna equipos a colaboradores.</p>
              <div className="app-hr"></div>
              <div style={{ display: "flex", width: "100%", marginRight: "30px" }}>
                <div style={{ display: "flex", width: "60%", flexDirection: "column" }}>
                  <div style={{ marginTop: "30px" }}>
                    <label>Seleccione el equipo: </label>
                    <div style={{ width: "450px", marginTop: "10px" }}>
                      <Select
                        options={computadoras}
                        onChange={handleChangeComputadora}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 0,
                          colors: {
                            ...theme.colors,
                            primary: masterState.get().color,
                            primary25: masterState.get().color
                          },
                        })}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: "30px" }}>
                    <label>Seleccione el empleado: </label>
                    <div style={{ width: "450px", marginTop: "10px" }}>
                      <Select
                        options={employeeDatos}
                        isDisabled={disableEmployeeRef.current}
                        onChange={handleChangeEmployee}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 0,
                          colors: {
                            ...theme.colors,
                            primary: masterState.get().color,
                            primary25: masterState.get().color
                          },
                        })}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <button className='app-button animate primary' style={{ marginRight: "10px" }} disabled={disableEmployeeRef.current} onClick={handleShowAsiModal}>Asignar</button>
                    <button className='app-button animate primary' style={{ marginRight: "10px" }} disabled={statusComputadoraRef.current?.TipoEstado != 2 ? true : false}>Remover asignación</button>
                    <button className='app-button animate primary' style={{ marginRight: "10px" }} disabled={statusComputadoraRef.current?.TipoEstado == 3 ? true : false}>Enviar a mantenimiento</button>
                    <button className='app-button animate primary' style={{ marginRight: "10px" }} disabled={statusComputadoraRef.current?.TipoEstado != 1 ? true : false}>Dar de baja</button>
                  </div>

                  <div style={{ backgroundColor: "#eee", marginTop: "30px", padding: "10px" }}>
                    {
                      !selectedComputadora ?
                        <>
                          <p>Seleccione una computadora o un empleado para ver información</p>
                        </> : <>
                          {
                            filteredComputerRef.current ?
                              <>
                                {
                                  filteredComputerRef.current.map(ele => {
                                    return (
                                      <>
                                        <p><span style={{ fontWeight: "bold" }}>{ele.CaracteristicaDescripcion}</span>: {ele.Respuesta}</p>
                                      </>
                                    )
                                  })
                                }
                              </>
                              :
                              <>
                              </>
                          }
                          <p>{selectedComputadoraRef.current ?? ""}</p>
                          <p>{selectedEmployeeRef.current ?? ""}</p>
                        </>
                    }
                  </div>

                </div>
                <div style={{ display: "flex", width: "40%", marginRight: "40px" }}>
                  <RightMenu />
                </div>
              </div>
            </NavPageContainer>
          </>
      }
    </>
  );


}

export default Asignar