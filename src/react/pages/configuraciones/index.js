
import { NavPageContainer,Link, NavPageContainerRight, ColorPickerItem, ColorPickerPalette, LinkCompound } from 'react-windows-ui'
import React, { useState, useEffect, createContext } from 'react'
import NavigationWindow from '../../components/Navigation'
import { DataContext, DataProvider } from '../../context/DataContext'

const Configuracion = () => {

const { setColor } = createContext(DataContext);

    return (
      <>
        <NavigationWindow/>
            <NavPageContainer
            hasPadding={true}
            animateTransition={true}>

            <h1>Configuraciones del Sistema</h1>
            <p>Configure sus preferencias del sistema.</p>
            <div className="app-hr"></div>
            <div className="home-color-picker">
              <h2>Color del sistema</h2>
              <ColorPickerItem
                defaultChecked
                name="1"
                color="#0078D7"
                onChange={ (color) => setColor(color)}/>
              <ColorPickerItem
                name="1"
                color="#6632a8"
                onChange={ (color) => setColor(color)}/>
              <ColorPickerItem
                name="1"
                color="#881798"
                onChange={ (color) => setColor(color)}/>
              
              <ColorPickerItem
                name="1"
                color="#00B294"
                onChange={ (color) => setColor(color)}/>
              <ColorPickerItem
                name="1"
                color="#69797E"
                onChange={ (color) => setColor(color)}/>
              <ColorPickerPalette
                name="1"
                color="#5ebd06"
                onChange={ (color) => setColor(color)}/>
            </div>
            <div>
            <h2>Más configuraciones</h2>
                <LinkCompound
                  style={{margin:'5px 5px 0 0',width:300}}
                  to="/AboutLayout"
                  title="Sucursales"
                  subtitle="Administrar registros de sucursales"
                  icon={<i className="icons10-location"></i>}
                  focused={true}
                  margin="5px 5px 0 0" />

                <LinkCompound
                  style={{margin:'5px 5px 0 0',width:300}}
                  to="/LoginLayout"
                  title="Ciudades"
                  subtitle="Administrar registros de ciudades"
                  icon={<i className="icons10-location-point"></i>}
                  focused={true} />

                <LinkCompound
                  style={{margin:'5px 5px 0 0',width:300}}
                  to="/BlogLayout"
                  title="Áreas"
                  subtitle="Administrar áreas y departamentos"
                  icon={<i className="icons10-fax"></i>}
                  focused={true} />

                <LinkCompound
                  to="/ContactsLayout"
                  title="Mantenimientos"
                  subtitle="Registrar mantenimientos de equipos"
                  icon={<i className="icons10-services"></i>}
                  focused={true}
                  style={{margin:'5px 5px 0 0',width:300}} />

            </div>
        </NavPageContainer>
    </>
  );
}
export default Configuracion;