
import { NavPageContainer, InputText, RadioButton, Button, NavPageContainerRight, LinkCompound } from 'react-windows-ui'
import React, { useState, useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import Select from 'react-select'

const Equipos = () => {

  const [entities, setEntities] = useState([])
  const [loading, setLoading] = useState(true)
  const [controls, setControls] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    getAllCategories()
    setLoading(false)
  }, [])

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
        console.log(obj)
      })
      setEntities(arre)
      // setLoading(false)
    } catch (error) {
      alert(error)
    }
  }

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
      result.forEach(ele => {
        var obj = {
          id: ele.IdCaracteristica,
          name: ele.CaracteristicaDescripcion,
          required: ele.Requerido,
          placeholder: ele.Placeholder,
          tooltip: ele.Tooltip,
          type: ele.CaracteristicaTipo
        }
        arre.push(obj)
        console.log(obj)
      })
      setControls(arre)
      // setLoading(false)
    } catch (error) {
      alert(error)
    }
  }

  const handleListChange = async(e) => {
    //setLoading(true)
    //setSelected(e.value)
    await getEntityEntries(e.value)
    //setLoading(false)
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
            <p>Añada, modifique o elimine registro de sus equipos informáticos.</p>
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
            <div>
              {
                controls.map(item => {
                  return (
                    <div style={{marginTop: "20px"}}>
                      <p>{item.name}</p>
                      <InputText
                        //label={item.name}
                        placeholder={item.placeholder}
                        tooltip={item.tooltip}
                        required={item.required}
                      />
                    </div>
                  )
                })
              }
            </div>
          </NavPageContainer>
        </>
      }
    </>
  );
}

export default Equipos