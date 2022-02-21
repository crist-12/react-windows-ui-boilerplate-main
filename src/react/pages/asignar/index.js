
import { NavPageContainer, Link, InputText } from 'react-windows-ui'
import React, { useState, useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
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
              <p>Start adding your fantastic ui here.</p>
              <Link>Components here</Link>
              {
                controls.map((item) => {
                  //  const [{item.CaracteristicaDescripcion},{ item.CaracteristicaDescripcion+"Input"},  {resetInput}] = useInput({type: "number", placeholder:"Texto", tooltip: "Este es un ejemplo", min: 0})
                  return (<>
                    <div style={{ marginTop: '30px', alignItems: 'center', width: '100%' }}>
                      <p style={{ marginRight: '10px' }}>{item.label}:</p>
                      <InputText
                        placeholder={item.placeholder}
                        tooltip={item.tooltip}
                        //value={modelo}
                        //onChange={e => setModelo(e.target.value)}
                        type={item.type}
                      />
                    </div>
                  </>)
                })
              }
            </NavPageContainer>
          </>
      }
    </>
  );
}

export default Asignar