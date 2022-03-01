
import { NavPageContainer, InputText, RadioButton, Button, NavPageContainerRight, LinkCompound } from 'react-windows-ui'
import React, { useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import Select from 'react-select'
import useState from 'react-usestateref'
const Equipos = () => {

  const [entities, setEntities] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [controls, setControls] = React.useState([])
  const [selected, setSelected] = React.useState(null)
  const [options, setOptions] = React.useState([[]])
  const [respuesta, setRespuesta, respuestaRef] = useState([])

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
        resp[obj.name] = ""
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
        console.log(obj)
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
    await getEntityEntries(e.value)
    //setLoading(false)
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
                <label>{item.name}</label>
                <div style={{ margin: "10px 0" }}>
                  <input
                    className='app-input-text'
                    placeholder={item.placeholder}
                    tooltip={item.tooltip}
                    type={item.type}
                    required={req}
                    onChange={handleChangeControlValue}
                    //onChange={change}
                    id={item.name} />
                </div>
              </div>
            )
          case "textarea":
            return (
              <div style={{ margin: "15px 0px" }}>
                <label>{item.name}</label>
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
                <label style={{ marginBottom: "15px" }}>{item.name}</label>
                <br />
                <div style={{ marginTop: "15px" }}>
                  <label htmlFor="filePicker" style={{ background: "lightgray", padding: "5px 10px" }}>
                    {item.placeholder ?? "Escoge un archivo"}
                  </label>
                  <input id="filePicker" style={{ visibility: "hidden" }} type={"file"} required={req}/>
                </div>
                <br />
              </div>)
          case 'select':
            /*getOptions(item.key)*/
            var arrayAux = options.filter(ele => ele.key == item.id)
            return (
              <div style={{ margin: "15px 0px" }}>
                <label>{item.name}</label>
                <div style={{ margin: "10px 0" }}>
                  <Select
                    name={item.name}
                    options={arrayAux}
                    onChange={handleChangeControlValue}
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
    //console.log(e.target.id)
    //console.log(e.target.value)
    //if()
   var auxArray = [...respuesta]
   var aux = {};
    aux[e.target.id] = e.target.value;
    auxArray.push(aux)
    console.info(auxArray)
    /*if(!e.target?.value){
      auxArray[name] = e.value;
    } 
    else {
      auxArray[e.target.id] = e.target.value;
    }
    console.error(auxArray)
    setRespuesta([...respuesta, auxArray])
    console.log(respuestaRef.current)*/
    if(e.target?.value){
//      auxArray[e.target.id] = e.target.value;
    }
    // TODO https://stackoverflow.com/questions/40250139/push-object-into-array
    
    console.log(auxArray[e.target.id])
    //auxArray["ejemplo"] = 54
    setRespuesta(auxArray)
   // setRespuesta(auxArray)
   // console.log(respuestaRef.current)
  }

  const change = (e, type) => {
    if(!e.target?.value) console.log("Soy un select"); else console.log("Soy un input")
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
            <div style={{ marginRight: "20px" }}>
              <Select
                // defaultInputValue='Seleccione una categoria'
                defaultValue={entities[0]}
                //value={selected}
                options={entities}
                onChange={handleListChange}
              />
            </div>
            <form>
            <fieldset style={{ borderRadius: "10px", marginTop: "15px", marginRight: "20px", color: "d9d9d9", borderColor: "d9d9d9" }}>
              {
                controls.map(item => {
                  return showControls(item)
                })
              }
              <button type="submit" className='app-button animate primary'>Guardar</button>
            </fieldset>
            </form>

          </NavPageContainer>
        </>
      }
    </>
  );
}

export default Equipos