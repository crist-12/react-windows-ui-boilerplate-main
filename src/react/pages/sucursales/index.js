
import { NavPageContainer } from 'react-windows-ui'
import React, { useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import { Dialog, Button } from 'react-windows-ui'
import MaterialTable from 'material-table'
import useState from 'react-usestateref'
import Select from 'react-select'


const Sucursal = () => {

  const [showModal, setShowModal] = React.useState(false);
  const [sucursalName, setSucursalName] = React.useState("")
  const [selectedCity, setSelectedCity] = React.useState("")
  const [listCat, setlistCat] = React.useState("")
  const [loading, setLoading] = React.useState(true)
  const [cities, setCities, citiesRef] = useState();
  const [label, setLabel] = useState();

  let enumList = []


  const columnas = [
    {
      title: 'Id',
      field: 'id',
      hidden: true
    },
    {
      title: 'Sucursal',
      field: 'sucursal'
    },
    {
      title: 'Ciudad',
      field: 'ciudad'
    }

  ]

  useEffect(() => {
    getItems()
    getCities()
  }, [])



  const addItem = async () => {
    try {
      setLoading(true)
      const response = await fetch(process.env.REACT_APP_HOME + "sucursales", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "NombreSucursal": sucursalName, "IdCiudad": selectedCity })
      })
      console.log(sucursalName)
      console.log(selectedCity)
      setSucursalName("")
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
      const response = await fetch(process.env.REACT_APP_HOME + "sucursales", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const result = await response.json()
      var arre = []
      result.forEach(ele => {
        var obj = {
          id: ele.IdSucursal,
          ciudad: ele.NombreCiudad ?? "No hay",
          sucursal: ele.NombreSucursal
        }
        arre.push(obj)
        console.log(obj)
      })
      setlistCat(arre)
      setLoading(true)
      //console.log(result)
      //setlistCat(response)

    } catch (error) {
      console.log(error)
    }
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
        //enumList.push(obj.label)
        //setLabel([...label, obj.label])
        console.log(obj)
      })
      setCities(arre)
      setLoading(false)
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

              <h1>Sucursales</h1>
              <p>Añada, modifique o elimine sucursales</p>
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
                  data={listCat}
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
                  <h3>Nueva Sucursal</h3>
                  <div className="app-hr"></div>
                  <div >
                    <p>Nombre de sucursal: </p>
                    <input
                      value={sucursalName}
                      onChange={e => setSucursalName(e.target.value)}
                      style={{ width: '70%', height: '30px' }}
                    />
                  </div>
                  <div>
                    <p>Nombre de la ciudad: </p>
                    <Select
                      options={cities}
                      theme={(theme)=> ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          text: 'white',
                          primary: 'red'
                        }
                      })}
                      onChange = {(e)=> setSelectedCity(e.value)}
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

export default Sucursal