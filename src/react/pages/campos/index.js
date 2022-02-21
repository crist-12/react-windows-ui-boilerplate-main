
import { NavPageContainer, LinkCompound, View, ButtonIcon, InputText, Switch } from 'react-windows-ui'
import React, { useState, useEffect, useContext } from 'react'
import NavigationWindow from '../../components/Navigation'
import "./styles.css"
import { useMasterState } from '../../stores/MasterStore'

const Campos = () => {

    const [types, setTypes] = useState([])
    const [loading, setLoading] = useState(false)
    const [campos, setCampos] = useState([])
    const masterState = useMasterState();

    const getAllTypes = async () => {

        try {
            const response = await fetch(process.env.REACT_APP_HOME + "control/types", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const result = await response.json()
            var arre = []
            result.forEach(ele => {
                var obj = {
                    id: ele.IdTipoCampo,
                    type: ele.DescripcionTipo,
                    display: ele.DisplayText,
                    icon: ele.Icono
                }
                arre.push(obj)
                console.log(obj)
            })
            setTypes(arre)
            setLoading(false)
        } catch (error) {

        }
    }

    useEffect(() => {
        getAllTypes()
    }, [])

    const addItemCampo = (campoObj) => {
        console.log(campoObj)
        setCampos([...campos, campoObj])
    }

    return (
        <>
            {
                loading ? <></> : <>
                    <NavigationWindow />

                    <NavPageContainer
                        hasPadding={true}
                        animateTransition={true}>

                        <h1>Entidades</h1>
                        <p>Añade campos y característica para tus entidades.</p>
                        <div className="app-hr"></div>
                        <div style={{ display: 'flex', height: '100%', padding: '15px', gap: '5px' }}>
                            <div style={{ width: '30%' }}>
                                {
                                    types.map((item, index) => {
                                        return (
                                            <>
                                                <LinkCompound
                                                    to="#"
                                                    focused
                                                    title={item.display}
                                                    onClick={() => addItemCampo(item)}
                                                    style={{ width: '100%', margin: '10px 0px' }}
                                                    icon={<i className={item.icon}></i>}
                                                />

                                            </>
                                        )
                                    })
                                }
                            </div>
                            <div style={{ width: '70%' }}>
                                {
                                    campos.map((item) => {
                                        return (
                                            <>
                                                <View
                                                    isVisible={true}
                                                    zIndex={1}
                                                    animationType="fade"
                                                    style={{ height: 180, width: '90%', margin: '10px 0px', backgroundColor: '#EEE', padding: '10px' }}>


                                                    <div>
                                                        <div style={{ width: "100%" }}>
                                                            <span style={{ fontWeight: 'bold' }}>Campo de tipo {item.display.toLowerCase()}</span>
                                                            <ButtonIcon
                                                                icon={<i className="icons10-cross" style={{ color: masterState.get().color }}></i>}
                                                                onClick={() => { }}
                                                                tooltip="Eliminar"
                                                            />
                                                            <ButtonIcon
                                                                icon={<i className="icons10-eye" style={{ color: masterState.get().color }}></i>}
                                                                onClick={() => { }}
                                                                tooltip="Previsualizar"
                                                            />

                                                            <br />
                                                        </div>
                                                        {/* <div style={{margin: '20px 0px'}}>
                                                            <div style={{margin: "10px 0px"}}>
                                                                <span style={{marginRight: '10px'}}>Placeholder: </span>
                                                                <InputText placeholder='Ingrese el placeholder' tooltip='Placeholder'/>
                                                            </div>
                                                            <div style={{margin: "10px 0px"}}>
                                                                <span style={{marginRight: '10px'}}>Tooltip: </span>
                                                                <InputText placeholder='Ingrese el tooltip' tooltip='Tooltip'/>
                                                            </div>
                                                            <div style={{marginTop: "10px"}}>
                                                                <span style={{marginRight: '10px'}}>Requerido: </span>
                                                                <Switch 
                                                                    style={{color: masterState.get().color}}
                                                                    labelOff="No"
                                                                    labelOn='Sí'
                                                                />
                                                            </div>
                                                        </div> */}
                                                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'flex-start', alignItems: 'stretch', alignItems: 'flex-start' }}>
                                                            <div style={{ flex: '1 0 auto', alignSelf: 'auto' }}>
<p>safa</p>
                                                            </div>
                                                            <div style={{ flex: '1 0 auto', alignSelf: 'auto' }}>
<p>asasf</p>
                                                            </div>
                                                        </div>
                                                        </div>
                                                </View>

                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </NavPageContainer>
                </>
            }
        </>
    );
}

export default Campos