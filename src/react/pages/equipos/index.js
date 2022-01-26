
import { NavPageContainer, InputText, RadioButton, Select, Button, NavPageContainerRight, LinkCompound } from 'react-windows-ui'
import React, { useState, useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'

const Equipos = () => {
    return (
      <>
        <NavigationWindow/>
            <NavPageContainer
            hasPadding={true}
            animateTransition={true}>
            <h1>Equipos</h1>
            <p>Añada, modifique o elimine registro de sus equipos informáticos.</p>
            <div className="app-hr"></div>
            <div style={{margin: 2, alignItems: 'center', width: '100%'}}>
            <p style={{marginRight: '10px'}}>Marca del Equipo:</p>
            <InputText
              placeholder="Marca del equipo"
              tooltip="Ingrese la marca del equipo"
            />
            </div>
            <div style={{marginTop: '30px', alignItems: 'center',  width: '100%'}}>
            <p style={{marginRight: '10px'}}>Modelo del Equipo:</p>
            <InputText
              placeholder="Modelo del equipo"
              tooltip="Ingrese el modelo del equipo"
            />
            </div>
            <div style={{marginTop: '30px', alignItems: 'center',  width: '100%'}}>
            <p style={{marginRight: '10px'}}>Número de serie:</p>
            <InputText
              placeholder="Número de serie"
              tooltip="Ingrese el número de serie"
            />
            </div>
            <div style={{marginTop: '30px', alignItems: 'center',  width: '100%'}}>
            <p style={{marginRight: '10px'}}>Fecha de Adquisición:</p>
            <InputText
              type="date"
              placeholder="Selecciona una fecha"
              tooltip="Selecciona la fecha de adquisición del equipo"
            />
            </div>
            <div style={{marginTop: '30px', alignItems: 'center',  width: '100%'}}>
            <p style={{marginRight: '10px'}}>Procesador:</p>
            <InputText
              placeholder="Datos del procesador"
              tooltip="Ingrese los datos del procesador del equipo"
            />
            </div>
            <p style={{marginRight: '10px', marginTop: '30px'}}>Tipo de disco duro:</p>
            <div style={{display: 'inline-flex'}}>
            <RadioButton
                defaultChecked={true}
                name="disk"
                value="HDD"
                label="Hard Disk Drive HDD"
              />
              <div style={{marginRight: '30px'}}></div>
              <RadioButton
                defaultChecked={false}
                name="disk"
                value="SSD"
                label="Solid State Drive SSD"
              />
            </div>
            <div style={{marginTop: '30px', alignItems: 'center',  width: '100%'}}>
            <p style={{marginRight: '10px'}}>Memoria RAM:</p>
            <InputText
              type="number"
              placeholder="Memoria RAM instalada"
              tooltip="Cantidad de RAM instalada"
            />
            </div>
            <div style={{marginTop: '30px', alignItems: 'center',  width: '100%'}}>
            <p style={{marginRight: '10px'}}>Tipo de RAM:</p>
            <Select
              defaultValue="2" //Optional
            //  onChange={}
              data={[
                {label: 'DDR3', value: '2'},
                {label: 'DDR4', value: '3'},
                {label: 'DDR5', value: '4'},

              ]}
            />
            </div>
            <div style={{marginTop: '30px', alignItems: 'center',  width: '100%'}}>
            <p style={{marginRight: '10px'}}>Precio + ISV:</p>
            <InputText
              label="L. "
              width= {225}
              placeholder="0.00"
              tooltip="Precio más el impuesto del equipo"
              style={{alignItems: 'right'}}
            />
            </div>
            <div style={{marginTop: '30px', alignItems: 'center',  width: '100%'}}>
              <p style={{marginRight: '10px'}}>Factura del equipo:</p>
              <label htmlFor="filePicker" style={{ background:"grey", padding:"5px 10px" }}>
                  Explorar archivos
              </label>
              <input id="filePicker" style={{visibility:"hidden"}} type={"file"}></input>
            </div>
            <div style={{marginTop: '30px', marginBottom: '80px'}}>
              <Button
                value="Registrar equipo"
                isLoading={false}
                icon={<i className="icons10-plus"></i>}
                onClick={() => {}}
                tooltip="Registrar el equipo"
                />
                <br/>
                <br/>
                <br/>
            </div>
        </NavPageContainer>
        <NavPageContainerRight style={{marginTop: '40px'}}>
        <h4 className="m-5">Acciones</h4>
        <LinkCompound
          to="#"
          title="Equipos registrados"
          subtitle="Ver detalladamente los equipos registrados"
          icon={<i className="icons10-area-chart color-primary"></i>}
          
        />
      </NavPageContainerRight>
    </>
  );
}

export default Equipos