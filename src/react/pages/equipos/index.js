
import { NavPageContainer, InputText, RadioButton, Button, NavPageContainerRight, LinkCompound } from 'react-windows-ui'
import React, { useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import Select from 'react-select'
import useState from 'react-usestateref'
import { useMasterState } from '../../stores/MasterStore'
import { useAuthState } from '../../stores/AuthStore'
import MaterialTableComponent from '../../components/MaterialTable'
import MaterialTable from 'material-table'

const Equipos = () => {

  const [entities, setEntities] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [controls, setControls] = React.useState([])
  const [selected, setSelected] = React.useState(null)
  const [options, setOptions] = React.useState([[]])
  const [respuesta, setRespuesta, respuestaRef] = useState([])
  const [entityCode, setEntityCode, entityCodeRef] = useState()
  const [mode, setMode] = React.useState('R')
  const [tableEquipo, setTableEquipo, tableEquipoRef] = useState([])
  const [lastKey, setLastKey, lastKeyRef] = useState()
  // const [dataList, setDataList] = React.useState([])

  const masterState = useMasterState();
  const authState = useAuthState();


  const columnas = [
    {
      title: 'Equipo',
      field: 'equipo'
    }
  ]

  useEffect(() => {
    getAllCategories()
    setLoading(false)
  }, [])

  // Obtiene listado de las entidades para llenar el select
  const getAllCategories = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "category", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json()
      var arre = []
      result.forEach(ele => {
        var obj = {
          value: ele.IdCategoria,
          label: ele.DescripcionCategoria
        }
        arre.push(obj)
        // console.log(obj)
      })
      setEntities(arre)
      // setLoading(false)
    } catch (error) {
      alert(error)
    }
  }

  // Cuando seleccionemos una entidad, obtenemos los controles de esa entidad
  const getEntityEntries = async (id) => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "control/filter/" + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json()
      var arre = []
      var resp = [...respuesta]
      result.forEach(ele => {
        var obj = {
          id: ele.IdCaracteristica,
          key: ele.IdCategoria,
          name: ele.CaracteristicaDescripcion,
          required: ele.Requerido,
          placeholder: ele.Placeholder,
          tooltip: ele.Tooltip,
          type: ele.DescripcionTipo
        }
        arre.push(obj)
        var keyObj = "CTRL-" + obj.id
        setEntityCode(obj.key)
        resp[keyObj] = ""
        //setRespuesta([...respuesta, resp])
        // console.log(resp)
      })
      setRespuesta(resp)
      // console.log(resp)
      setControls(arre)
      getOptions(id)
      // setLoading(false)
    } catch (error) {
      alert(error)
    }
  }


  // Obtiene las opciones para los controles
  const getOptions = async (id) => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "control/options/" + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json()
      var arre = []
      result.forEach(ele => {
        var obj = {
          value: ele.IdOpcion,
          label: ele.OpcionDescripcion,
          key: ele.IdCaracteristica
        }
        arre.push(obj)
        //console.log(obj)
      })
      setOptions(arre)
    } catch (error) {
      alert(error)
    }
  }

  // Maneja el evento de seleccionar una entidad
  const handleListChange = async (e) => {
    //setLoading(true)
    //setSelected(e.value)
    if (mode == 'R')
      await getEntityEntries(e.value)
    else if (mode == 'L') {
      setLoading(true)
      await getAllEntriesTable(e.value)
      setLoading(false)
    }

    //setLoading(false)
  }


  const getAllEntriesTable = async (id) => {
    //setLoading(true)
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "control/equipos", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json()
      var arre = []
      result.forEach(ele => {
        var obj = {
          equipo: ele.Equipo
        }
        arre.push(obj)
        //console.log(obj)
      })
      setTableEquipo(arre)
      //setLoading(false)
    } catch (error) {
      alert(error)
    }
  }

  // Maneja el evento de mostrar los controles de cada entidad
  const showControls = (item) => {
    try {
      if (item?.type != undefined) {
        var req = item.required.data[0];
        // console.log(req)
        if (req == 1) req = true; else req = false;
        //console.log(req)
        switch (item.type) {
          case "text": case "number": case "date":
            return (
              <div style={{ margin: "15px 0px" }}>
                <label>{item.name} {req ? <label style={{ color: masterState.get().color }}>*</label> : <></>}</label>
                <div style={{ margin: "10px 0" }}>
                  <input
                    className='app-input-text'
                    placeholder={item.placeholder}
                    tooltip={item.tooltip}
                    type={item.type}
                    required={req}
                    onChange={handleChangeControlValue}
                    //onChange={change}
                    id={item.id} />
                </div>
              </div>
            )
          case "textarea":
            return (
              <div style={{ margin: "15px 0px" }}>
                <label>{item.name} {req ? <label style={{ color: masterState.get().color }}>*</label> : <></>}</label>
                <div style={{ margin: "10px 0" }}>
                  <textarea
                    className='app-textarea'
                    style={{ resize: 'none', width: '350px', height: '150px' }}
                    placeholder={item.placeholder}
                    tooltip={item.tooltip}
                    required={req} />
                </div>
              </div>
            )
          case 'file':
            return (
              <div style={{ margin: "15px 0px" }}>
                <label>{item.name} {req ? <label style={{ color: masterState.get().color }}>*</label> : <></>}</label>
                <br />
                <div style={{ marginTop: "15px" }}>
                  <label htmlFor="filePicker" style={{ background: "lightgray", padding: "5px 10px" }}>
                    {item.placeholder ?? "Escoge un archivo"}
                  </label>
                  <input id="filePicker" style={{ visibility: "hidden" }} type={"file"} required={req} />
                </div>
                <br />
              </div>)
          case 'select':
            /*getOptions(item.key)*/
            var arrayAux = options.filter(ele => ele.key == item.id)
            return (
              <div style={{ margin: "15px 0px" }}>
                <label>{item.name} {req ? <label style={{ color: masterState.get().color }}>*</label> : <></>}</label>
                <div style={{ margin: "10px 0" }}>
                  <Select
                    name={item.id}
                    // id={item.id}
                    placeholder={item.placeholder}
                    options={arrayAux}
                    onChange={handleChangeSelectValue}
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
            )
        }
      }
    } catch (error) {

    }

  }

  //Detecta cual es el control que se esta editando y asigna el valor al objeto de respuesta
  const handleChangeControlValue = (e) => {
    var auxArray = respuesta

    var keyName = "CTRL-" + e.target.id;
    // if(e?.value){

    if (e.target?.value) {
      auxArray[keyName] = e.target.value;
    } else
      console.log(auxArray)
    setRespuesta(auxArray)
  }

  const handleChangeSelectValue = (e, { name }) => {
    var auxArray = respuesta

    var keyName = "CTRL-" + name
    // if(e?.value){
    auxArray[keyName] = e.value;
    // }else

    console.log(auxArray)
    setRespuesta(auxArray)
  }

  const getLastProductKey = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "control/key" , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json()
      setLastKey(result[0].Key)
    } catch (error) {
      alert(error)
    }
  }

  const saveComputerState = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "control/state", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"IdEquipo": lastKeyRef.current})
      })
      const result = await response.json()
      
    } catch (error) {
      alert(error)
    }
  }

  const handleSaveNewEntry = async (event) => {
    event.preventDefault()
    try {
      await getLastProductKey();


      let llaves = Object.keys(respuesta)
      const entityCode = entityCodeRef.current;

      if(entityCode == 1){
        await saveComputerState();
      }

      llaves.forEach((el) => {
        console.log(el)
        var show = el.substring(5)
        console.log(respuesta[el])
        const response = fetch(process.env.REACT_APP_HOME + "control/entries", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "IdEquipoIngresado": lastKeyRef.current, "IdCategoria": entityCode, "IdCaracteristica": show, "Respuesta": respuesta[el], "UsuarioCreo": authState.me.get().username })
        })
      }).then((response) => {
        console.log(response);
      })

       
    } catch (error) {
      alert("Ocurrio un error al guardar el empleado" + error)
    }
  }

  return (
    <>
      {
        loading ? <></> : <>
          <NavigationWindow />
          <NavPageContainer
            hasPadding={true}
            animateTransition={true}>
            <h1>Equipos</h1>
            <p>Ingrese productos a su stock de inventario.</p>
            <div className="app-hr"></div>
            <div>
              <span style={{ fontWeight: "bold" }}>Modo</span>
              <br />
              <div style={{ display: "flex", margin: "15px 0px" }}>
                <div style={{ marginRight: "15px" }}>
                  <RadioButton name="radio" value={mode} label='Registro' onChange={() => setMode('R')} defaultChecked />
                </div>
                <div>
                  <RadioButton name="radio" value={mode} label='Lectura' onChange={() => setMode('L')} />
                </div>
              </div>
            </div>

            <div style={{ marginRight: "20px" }}>
              <Select
                // defaultInputValue='Seleccione una categoria'
                defaultValue={entities[0]}
                //value={selected}
                options={entities}
                onChange={handleListChange}
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
            {
              mode == 'R' ?
                <>
                  {
                    controls.length >= 1 ?
                      <form>
                        <fieldset style={{ borderRadius: "10px", marginTop: "15px", marginRight: "20px", color: "d9d9d9", borderColor: "d9d9d9" }}>
                          {
                            controls.map(item => {
                              return showControls(item)
                            })
                          }
                          <button type="submit" className='app-button animate primary' onClick={handleSaveNewEntry}>Guardar</button>
                        </fieldset>
                      </form>
                      :
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <h3 style={{ color: "lightgray", marginTop: "40px" }}>Selecciona un elemento de la lista para añadir productos</h3>
                      </div>
                  }
                </>
                :
                !tableEquipo ? <><p>Cargando...</p></> :
                  <>
                    <MaterialTable
                      columns={columnas}
                      data={tableEquipo}
                      title="Equipos"
                      style={{ boxShadow: 'none', marginRight: '30px' }}
                      localization={{
                        header: {
                          actions: 'Acciones'
                        },
                        pagination: {
                          labelDisplayedRows: '{from}-{to} de {count}',
                          labelRowsSelect: 'filas',
                          labelRowsPerPage: 'Filas por página',
                          firstAriaLabel: 'Primera página',
                          firstTooltip: 'Primera página',
                          previousAriaLabel: 'Página anterior',
                          previousTooltip: 'Página anterior',
                          nextAriaLabel: 'Siguiente página',
                          nextTooltip: 'Siguiente página',
                          lastAriaLabel: 'Última página',
                          lastTooltip: 'Última página'
                        },
                        toolbar: {
                          nRowsSelected: '{0} fila(s) seleccionada(s)',
                          searchTooltip: 'Buscar...',
                          searchPlaceholder: 'Buscar...',
                          exportTitle: "Equipos",
                          exportPDFName: 'Exportar como PDF',
                          exportCSVName: 'Exportar como CSV'
                        },
                        body: {
                          emptyDataSourceMessage: 'No hay datos para mostrar',
                          filterRow: {
                            searchTooltip: 'Buscar...'
                          }
                        }
                      }}
                      options={{
                        actionsColumnIndex: -1,
                        exportButton: true,
                        draggable: true
                      }}
                      actions={
                        [
                          {
                            icon: 'edit',
                            tooltip: 'Editar categoria',
                            onClick: (event, rowData) => alert("Has presionado la categoria: " + rowData.categoria)
                          },
                          {
                            icon: 'delete',
                            tooltip: 'Eliminar categoria',
                            onClick: (event, rowData) => alert("Has presionado la categoria: " + rowData.categoria)
                          }
                        ]
                      }

                    />
                  </>
            }

          </NavPageContainer>
        </>
      }
    </>
  );
}

export default Equipos