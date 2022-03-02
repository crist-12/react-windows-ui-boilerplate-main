
import { NavPageContainer } from 'react-windows-ui'
import React, { useEffect, useState } from 'react'
import NavigationWindow from '../../components/Navigation'
import { Dialog, Button } from 'react-windows-ui'
import MaterialTable from 'material-table'
import Select from 'react-select'


const Empleado = () => {

  const [showModal, setShowModal] = useState(false);
  const [empleadoName, setEmpleadoName] = useState("")
  const [selectedArea, setSelectedArea] = useState("")
  const [listCat, setlistCat] = useState([])	
  const [loading, setLoading] = useState(true)
  const [areas, setAreas] = useState();
  const [label, setLabel] = useState();

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
    getItems()
    getAreas()
    
  }, [])



  const addItem = async () => {
    try {
      setLoading(true)
      const response = await fetch(process.env.REACT_APP_HOME + "employee", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "NombreEmpleado": empleadoName, "EstadoEmpleado": 1, "IdArea": selectedArea })
      })
      console.log(empleadoName)
      console.log(selectedArea)
      setEmpleadoName("")
      await getItems()
      setShowModal(false)
      setLoading(false)
      alert("El empleado se guardó exitosamente")
    } catch (error) {
      alert("Ocurrio un error al guardar el empleado")
    }
  }

  const getItems = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_HOME + "employee", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const result = await response.json()
      var arre = []
      result.forEach(ele => {
        var obj = {
          id: ele.IdEmpleado,
          empleado: ele.NombreEmpleado,
          area: ele.DescripcionArea
        }
        arre.push(obj)
        console.log(obj)
      })
      setlistCat(arre)
     // setLoading(true)
      //console.log(result)
      //setlistCat(response)

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
        //enumList.push(obj.label)
        //setLabel([...label, obj.label])
        console.log(obj)
      })
      setAreas(arre)
      setLoading(false)
      setLoading(true)
      setLoading(false)
     // setLoading(false)
      //console.log(result)
      //setlistCat(response)

    } catch (error) {
      console.log(error)
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

              <h1>Empleados</h1>
              <p>Añada, modifique o elimine registros de empleados.</p>
              <div className="app-hr"></div>

              <div style={{ margin: '20px 0' }}>
                <Button
                  style={{ marginLeft: '30px' }}
                  value="Nueva"
                  onClick={() => setShowModal(true)}
                  icon={<i className="icons10-plus"></i>} />
              </div>
              <div style={{ width: '100%' }}>
                <MaterialTable
                  columns={columnas}
                  data={listCat ?? []}
                  title="Categorias"
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
                      exportTitle: "Categrorias",
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
              </div>
              <Dialog
                isVisible={showModal}
                onBackdropPress={() => setShowModal(false)}
                showDropShadow={true}>
                <div style={{ padding: '10px' }}>
                  <h3>Nuevo Empleado</h3>
                  <div className="app-hr"></div>
                  <div >
                    <p>Nombre de empleado: </p>
                    <input
                      value={empleadoName}
                      onChange={e => setEmpleadoName(e.target.value)}
                      style={{ width: '70%', height: '30px' }}
                    />
                  </div>
                  <div>
                    <p>Nombre de la ciudad: </p>
                    <Select
                      options={areas}
                      onChange = {(e)=> setSelectedArea(e.value)}
                    />
                  </div>
                  <div>
                    <Button
                      style={{ marginTop: '30px', marginLeft: '0px' }}
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

export default Empleado