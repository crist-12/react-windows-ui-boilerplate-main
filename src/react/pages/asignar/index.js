
import { NavPageContainer, Link, InputText, NavPageContainerRight, LinkCompound } from 'react-windows-ui'
import React, { useState, useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import RightMenu from '../../components/RightMenu'
import { useInput } from '../../hooks/useInput'
import { useState as useStateRef } from '@hookstate/core'


const Asignar = () => {

  const [controls, setControls] = useState([]);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    getControls()
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
              
              <RightMenu />

            </NavPageContainer>
          </>
      }
    </>
  );


}

export default Asignar