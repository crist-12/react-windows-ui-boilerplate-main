
import { NavPageContainer, Link, InputText, NavPageContainerRight, LinkCompound } from 'react-windows-ui'
import React, { useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import RightMenu from '../../components/RightMenu'
import Select from 'react-select';
import { useMasterState } from '../../stores/MasterStore'
import  useState  from 'react-usestateref'

const Asignar = () => {

  const masterState = useMasterState();

  const [controls, setControls] = React.useState([]);
  const [loading, setLoading] = React.useState(true)
  const [computadoras, setComputadoras] = React.useState([]);
  const [employeeDatos, setEmployeeDatos]= React.useState([])
  const [employee, setEmployee] = React.useState(null);
  const [selectedComputadora, setSelectedComputadora, selectedComputadoraRef] = useState(null);
  const [selectedEmployee, setSelectedEmployee, selectedEmployeeRef] = useState(null);
  const [filteredComputer, setFilteredComputer, filteredComputerRef] = useState(null);
  const [filteredEmployee, setFilteredEmployee] = useState(null);

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
            objComputadora.label = ele.Equipo + " 🔵";
            break;
          case "Sin asignar":
            objComputadora.label = ele.Equipo + " 🔴";
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

  const handleChangeComputadora = async(e) => {
    //var auxArray = [];
    //auxArray = computadoras.filter(ele => ele.value == e.value)
    setSelectedComputadora(e.value)
    await getComputerDetails(e.value)
  
  }

  const handleChangeEmployee = async(e) => {

    setSelectedEmployee(e.value)
  }

  const getAllEmployeeDetails = async() => {
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
      const response = await fetch(process.env.REACT_APP_HOME + "machines/"+selectedComputadoraRef.current, {
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

  return (
    <>
      {
        loading ? <></> :
          <>
            <NavigationWindow />
            <NavPageContainer
              hasPadding={true}
              animateTransition={true}>

              <h1>Asignar</h1>
              <p>Asigna equipos a colaboradores.</p>
              <div className="app-hr"></div>
              <div style={{ display: "flex", width: "100%", marginRight: "30px" }}>
                <div style={{ display: "flex", width: "60%", flexDirection: "column"}}>
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
                  <div style={{marginTop: "20px"}}>
                    <button className=' app-button animate primary' style={{marginRight: "10px"}}>Asignar</button>
                    <button className=' app-button animate primary' style={{marginRight: "10px"}}>Remover asignación</button>
                    <button className=' app-button animate primary' style={{marginRight: "10px"}}>Enviar a mantenimiento</button>
                    <button className=' app-button animate primary' style={{marginRight: "10px"}}>Dar de baja</button>
                  </div>

                  <div style={{backgroundColor: "#eee", marginTop: "30px", padding: "10px"}}>
                    {
                      !selectedComputadora && !selectedEmployee ? 
                      <>
                      <p>Seleccione una computadora o un empleado para ver información</p>
                      </> : <>
                      {
                        filteredComputerRef.current ?
                        <>
                        {
                          filteredComputerRef.current.map(ele => {
                            return(
                              <>
                            <p><span style={{fontWeight: "bold"}}>{ele.CaracteristicaDescripcion}</span>: {ele.Respuesta}</p>
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