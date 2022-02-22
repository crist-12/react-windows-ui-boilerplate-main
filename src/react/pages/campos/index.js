
import { NavPageContainer, LinkCompound, View, ButtonIcon, InputText, Switch, Dialog } from 'react-windows-ui'
import React, { useState, useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import "./styles.css"
import { useMasterState } from '../../stores/MasterStore'
import Select from 'react-select'
import { useState as useStateRef } from 'react-usestateref'

const Campos = () => {

    const MAX_FIELDS = 20
    const ITEMS_PER_FIELDS = 4
    const initialArr = new Array(MAX_FIELDS);
    for (var i = 0; i < MAX_FIELDS; i++) {
        initialArr[i] = new Array(ITEMS_PER_FIELDS);
    }

    const visibleDialogs = new Array(MAX_FIELDS).fill(false);


    const [types, setTypes] = useState([])
    const [loading, setLoading] = useState(false)
    const [campos, setCampos] = useState([])
    const [dialog, setDialog] = useState(visibleDialogs)
    const [propsCampos, setPropsCampos] = useState(initialArr)
    const [itemModal, setItemModal] = useState()
    const [indexModal, setIndexModal] = useState()
    const [options, setOptions] = useState([])
    const [flag, setFlag] = useState(false)
    const masterState = useMasterState()




    const onChangeHandler = (event) => {
        const { name, value } = event.target;

        let key = event.target.getAttribute('a_key');
        //console.log(name + "-"+value+"-"+key)
        let allData = [...propsCampos];
        allData[name][key] = value;
        //allData[name].splice(key, 0, value)
        setPropsCampos(allData)
        //console.log(propsCampos)
    }

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
        let oldArray = [...campos]
        oldArray.push(campoObj);
        setCampos([...campos, campoObj])
    }


    const handleToggleVisible = (item, indice) => {
/*         let visibleData = [...visibleDialogs];
        console.log(visibleData)
        visibleData.forEach(function (item, index, arr) {
            arr[index] = false;
        });

        visibleData[indice] = true; */
        setFlag(true)
        setItemModal(item)
        setIndexModal(indice)
       // setDialog(visibleData)
    }

    const handleToggleSwitch = (indice) => {
        let value = propsCampos[indice]?.[2] ?? false;
        let allData = [...propsCampos];
        if (value) {
            allData[indice][2] = false;
        } else {
            allData[indice][2] = true;
        }
        setPropsCampos(allData);
    }

    const showPrevisualization = (item, index) => {
        switch (item.type) {
            case 'text': case 'date':
                return (<InputText type={item.type} placeholder={propsCampos[index][0]} tooltip={propsCampos[index][1]} />)
            case 'number':
                return (<InputText type={item.type} placeholder={propsCampos[index][0]} tooltip={propsCampos[index][1]} min={0} />)
            case 'file':
                return (
                    <>
                        <label htmlFor="filePicker" style={{ background: "lightgray", padding: "5px 10px" }}>
                            {propsCampos[index][0] ?? "Escoge un archivo"}
                        </label>
                        <input id="filePicker" style={{ visibility: "hidden" }} type={"file"} />
                    </>)
            case 'select':
                var data = propsCampos[index]?.[3] ?? "Item1 | Item2 | Item3"
                var arrayData = data.split('|')
                var objData = []
                arrayData.forEach((ele, indice) => {
                    let obj = {
                        value: indice,
                        label: ele
                    }
                    objData.push(obj);
                })
                return (
                    <Select
                        //value={}
                        options={objData}
                        defaultValue={objData[0]}
                    />

                )
            case 'textarea':
                return (
                    <textarea className='app-textarea' style={{ resize: 'none' }} placeholder={propsCampos[index][0]} tooltip={propsCampos[index][1]} />
                )

        }
    }

    const hideModal = (index) => {
        let allData = [...dialog];
        allData.forEach((item, indice, arr) => {
            if (item)
                arr[indice] = false
        })
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
                                    campos.map((item, index) => {
                                        console.log(index)
                                        return (
                                            <>
                                                <View
                                                    isVisible={true}
                                                    zIndex={1}
                                                    animationType="fade"
                                                    style={{ height: 180, width: '90%', margin: '10px 0px', backgroundColor: '#EEE', padding: '10px', position: 'relative' }}>
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
                                                                onClick={() => handleToggleVisible(item, index)}
                                                                tooltip="Previsualizar"
                                                            />

                                                            <br />
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'flex-start', alignItems: 'stretch', alignItems: 'flex-start' }}>
                                                            <div style={{ flex: '1 0 auto', alignSelf: 'auto', marginTop: '20px' }}>
                                                                <span style={{ marginRight: '10px' }}>Placeholder: </span>
                                                                <input className='app-input-text' placeholder='Placeholder' name={index} a_key={0} onChange={onChangeHandler} value={propsCampos[index]?.[0] ?? ""} />
                                                            </div>
                                                            <div style={{ flex: '1 0 auto', alignSelf: 'auto', marginTop: '20px' }}>
                                                                <span style={{ margin: '0px 10px' }}>Tooltip: </span>
                                                                <input className='app-input-text' placeholder='Tooltip' name={index} a_key={1} onChange={onChangeHandler} value={propsCampos[index]?.[1] ?? ""} />
                                                            </div>
                                                        </div>

                                                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', marginTop: '10px' }}>
                                                            <div style={{ display: 'flex', marginTop: '20px', alignItems: 'center' }}>
                                                                <span style={{ marginRight: '10px' }}>Requerido: </span>
                                                                <Switch
                                                                    style={{ color: masterState.get().color }}
                                                                    defaultChecked={false}
                                                                    labelOff="No"
                                                                    labelOn='Sí'
                                                                    onChange={() => handleToggleSwitch(index)}
                                                                />
                                                            </div>

                                                        </div>

                                                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                            {
                                                                item.type == "select" ?
                                                                    <>
                                                                        <span style={{ marginTop: '10px', marginRight: '10px' }}>Valores (separe por barra cada valor): </span>
                                                                        <input className='app-input-text' placeholder='Ej. Item1 | Item2 | Item3' name={index} a_key={3} onChange={onChangeHandler} value={propsCampos[index]?.[3] ?? ""} style={{ marginTop: '10px' }} />
                                                                    </> :
                                                                    <></>
                                                            }
                                                        </div>



                                                    </div>
                                                    {/*                                                     <Dialog
                                                            isVisible={f}
                                                            onBackdropPress={() => setDialog(false)}
                                                            style={{height: '300px'}}
                                                            showDropShadow={true}>
                                                            <div style={{ padding: '10px' }}>
                                                                <h3>Previsualización</h3>
                                                                <div className="app-hr"></div>
                                                                <div>
                                                                    {
                                                                       // showPrevisualization(item, index)
                                                                    }
                                                                </div>
                                                            </div>
                                                        </Dialog> */}
                                                    <Dialog
                                                        isVisible={flag}
                                                        onBackdropPress={() => setFlag(false)}
                                                        style={{ height: '300px', position: 'fixed', zIndex: 100 }}
                                                        showDropShadow={true}>
                                                        <div style={{ padding: '10px' }}>
                                                            <h3>Previsualización</h3>
                                                            <div className="app-hr"></div>
                                                            <div>
                                                                {
                                                                    showPrevisualization(itemModal, indexModal)
                                                                }
                                                            </div>
                                                        </div>
                                                    </Dialog>
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

export default Campos;