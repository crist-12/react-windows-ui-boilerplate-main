
import { NavPageContainer } from 'react-windows-ui'
import React, { useState, useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import "../categorias/index.css"
import { Dialog, Button } from 'react-windows-ui'
import MaterialTable from 'material-table'
import { useInput } from '../../hooks/useInput'

const Categoria = () => {

  const [showModal, setShowModal] = useState(false);
  const [categoria, setCategoria] = useState("")
  const [listCat, setlistCat] = useState("")
  const [loading, setLoading] = useState(true)

  const columnas = [
    {
      title: 'Id',
      field: 'id',
      hidden: true
    },
    {
      title: 'Categoria',
      field: 'categoria'
    }
  ]

  useEffect(() => {
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
          id: ele.IdCategoria,
          categoria: ele.DescripcionCategoria ?? "No hay"
        }
        arre.push(obj)
        console.log(obj)
      })
      setlistCat(arre)
      setLoading(false)
      //console.log(result)
      //setlistCat(response)

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

  return (
    <>
      {
        loading ? <></> :
          <>
            <NavigationWindow />
            <NavPageContainer
              hasPadding={true}
              animateTransition={true}>

              <h1>Entidades</h1>
              <p>Añada, modifique o elimine sus entidades</p>
              <div className="app-hr"></div>
              {/* 
              <div style={{ margin: '20px 0' }}>
                <Button
                  style={{ marginLeft: '30px' }}
                  value="Nueva"
                  onClick={() => setShowModal(true)}
                  icon={<i className="icons10-plus"></i>} />
              </div> */}
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
                      <th>Creada por</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>

                  </tbody>
                </table>
                {/*            <TableView
              columns={[
                { 'title':'Categoría', 'showSortIcon': true },
                { 'title':'Acciones','showSortIcon': false, 'sortable': false },
              ]}
              rows={listCat}
              style= {{width: '100%', backgroundColor: 'blue'}}
            /> */}
                {/*  <MaterialTable
                  columns={columnas}
                  data={listCat}
                  title="Entidades"
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

                /> */}
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