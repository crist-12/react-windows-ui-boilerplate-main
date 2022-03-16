
import { NavPageContainer } from 'react-windows-ui'
import React, { useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import { Dialog, Button } from 'react-windows-ui'
import MaterialTable from 'material-table'
import Modal from '../../components/Modal';
import useState from 'react-usestateref'
import Select from 'react-select'
import "../sucursales/index.css"

const Sucursal = () => {

  const [showModal, setShowModal] = React.useState(false);
  const [addModal, setAddModal] = React.useState(false);
  const [selectedCity, setSelectedCity] = React.useState()
  const [listSucursales, setListSucursales, listSucursalesRef] = useState()
  const [loading, setLoading] = React.useState(true)
  const [cities, setCities, citiesRef] = useState();

  const [defaultValue, setDefaultValue, defaultValueRef] = useState();
  const [defaultName, setDefaultName, defaultNameRef] = useState();
  const [selectedSucursal, setSelectedSucursal, selectedSucursalRef] = useState();


  useEffect(() => {
    getItems()
    getCities()
  }, [])



  const addItem = async () => {
    if(defaultNameRef.current?.length > 0 && selectedCity){
    try {
      setLoading(true)
      const response = await fetch(process.env.REACT_APP_HOME + "sucursales", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "NombreSucursal": defaultNameRef.current, "IdCiudad": selectedCity })
      })
      await getItems()
      setLoading(false)
      setAddModal(false)
      setDefaultName()
      setDefaultValue()
      alert("La categoria se guardo exitosamente")
    } catch (error) {
      alert("Ocurrio un error al guardar la categoria")
    }}else{
      alert("Asegurate de llenar todos los campos")
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
      setListSucursales(result)
      setLoading(true)
      //console.log(result)
      //setListSucursales(response)

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
      //setListSucursales(response)

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

  const handleUpdateSucursal = (element) => {
    setShowModal(true);
    const objCity = {
      value: element.IdCiudad,
      label: element.NombreCiudad
    }
    setSelectedSucursal(element.IdSucursal)
    setDefaultName(element.NombreSucursal)
    setDefaultValue(objCity);
  }

  const updateSucursalData = async () => {
    try {
      setLoading(true)
      const response = await fetch(process.env.REACT_APP_HOME + "sucursales/" + selectedSucursalRef.current, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "NombreSucursal": defaultNameRef.current, "IdCiudad": selectedCity || defaultValueRef.current.value })
      })
      const result = await response.json();
      console.log(result)
      await getItems()
      setShowModal(false)
      setLoading(false)
      alert("La sucursal se actualizó exitosamente");
      setDefaultName()
      setDefaultValue()
    } catch (error) {
      alert("Ocurrio un error al actualizar la sucursal "+error)
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

              <Modal showOverlay={true} show={showModal} onClose={() => setShowModal(false)} size={"md"}>
                <Modal.Header>
                  <Modal.Title>Actualizacion de Sucursal</Modal.Title>
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
                      <tr>
                        <td>Ciudad</td>
                        <td>
                          <Select
                            options={cities}
                            defaultValue={defaultValueRef.current}
                            onChange={(e) => setSelectedCity(e.value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Modal.Body>
                <Modal.Footer>
                  <Button value="Aceptar" onClick={updateSucursalData} />
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
                      <tr>
                        <td>Ciudad</td>
                        <td>
                          <Select
                            options={cities}
                            defaultValue={defaultValueRef.current}
                            onChange={(e) => setSelectedCity(e.value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Modal.Body>
                <Modal.Footer>
                  <Button value="Aceptar" onClick={addItem} />
                  <Button value="Cerrar" onClick={() => setAddModal(false)} />
                </Modal.Footer>
              </Modal>

              <h1>Sucursales</h1>
              <p>Añada, modifique o elimine sucursales</p>
              <div className="app-hr"></div>
              <div style={{ display: "flex", flex: 1, marginRight: "30px", flexDirection: "column" }}>
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
                      <th>Sucursal</th>
                      <th>Ciudad</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      listSucursalesRef.current?.map(ele => {
                        return (
                          <tr>
                            <td>{ele.NombreSucursal}</td>
                            <td>{ele.NombreCiudad}</td>
                            <td style={{ display: "flex", justifyContent: "center" }}>
                              <button className='app-button primary animate' onClick={() => handleUpdateSucursal(ele)}>Actualizar</button>
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

export default Sucursal