
import { NavPageContainer, Link } from 'react-windows-ui'
import React, { useState, useEffect, useContext } from 'react'
import NavigationWindow from '../../components/Navigation'
import { AppTheme } from 'react-windows-ui'
import { ColorPickerItem } from 'react-windows-ui'
import { Gauge } from 'react-windows-ui'
import { useAuthState } from '../../stores/AuthStore'

const Home = () => {

  const authState = useAuthState();

  return (
    <>
      <NavigationWindow />

      <NavPageContainer
        hasPadding={true}
        animateTransition={true}>
        <h1>Home</h1>
        <div className='app-hr' />
        <div style={{ flex: 1, display: "flex", marginRight: "30px", marginTop: "30px", flexDirection: "column" }}>
          <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
            <h3>¡Bienvenido(a), {authState.me.get().username}!</h3>
          </div>
          <div style={{ display: "flex", flex: 1 }}>
            <div style={{ display: "flex", flex: 1, padding: "10px", justifyContent: "center", alignItems: "center", backgroundColor: "#eee", height: "170px", margin: "0 20px", flexDirection: "column" }}>
              {/*<div>
               <Gauge
                setProgress={44}
                size={120}
                value={"%"}
                valueFontSize={34}
                strokeColor="#198ae0"
                valueColor="#198ae0"
                backgroundColor="#198ae044"
              />
              </div>
              <div>
                <p>% de equipos asignados</p>
              </div> */}
            </div>
            <div style={{ display: "flex", flex: 1, padding: "10px", justifyContent: "center", alignItems: "center", backgroundColor: "#eee", height: "150px", margin: "0 20px" }}>

            </div>
            <div style={{ display: "flex", flex: 1, padding: "10px", justifyContent: "center", alignItems: "center", backgroundColor: "#eee", height: "150px", margin: "0 20px" }}>

            </div>
          </div>
        </div>
      </NavPageContainer>
    </>
  );
}

export default Home