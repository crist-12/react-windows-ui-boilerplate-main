
import { NavPageContainer, LinkCompound, View, ButtonIcon, InputText, Switch, Dialog, Link, Button } from 'react-windows-ui'
import React, { useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import "./styles.css"
import { useMasterState } from '../../stores/MasterStore'
import { useAuthState } from '../../stores/AuthStore'
import Select from 'react-select'
import useState from 'react-usestateref'

const Campos = () => {

    const MAX_FIELDS = 20
    const ITEMS_PER_FIELDS = 5
    const initialArr = new Array(MAX_FIELDS);
    for (var i = 0; i < MAX_FIELDS; i++) {
        initialArr[i] = new Array(ITEMS_PER_FIELDS);
    }

    const visibleDialogs = new Array(MAX_FIELDS).fill(false);


    const [types, setTypes] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [campos, setCampos] = React.useState([])
    const [dialog, setDialog] = React.useState(visibleDialogs)
    const [propsCampos, setPropsCampos] = React.useState(initialArr)
    const [itemModal, setItemModal] = React.useState()
    const [indexModal, setIndexModal] = React.useState()
    const [categorias, setCategorias] = React.useState()
    const [entityName, setEntityName] = React.useState()
    const [insertedId, setInsertedId, insertedIdRef] = useState()
    const [allCampos, setAllCampos] = React.useState()
    const [selectedCategory, setSelectedCategory] = React.useState()
    const [flag, setFlag] = React.useState(false)
    const masterState = useMasterState()
    const authState = useAuthState()

    //Maneja el cambio de los inputs en cada uno de los campos agregados
    const onChangeHandler = (event) => {
        const { name, value } = event.target;

        let key = event.target.getAttribute('a_key');
        //console.log(name + "-"+value+"-"+key)
        let allData = [...propsCampos];
        allData[name][key] = value;
        //allData[name].splice(key, 0, value)
        setPropsCampos(allData)
        console.log(propsCampos)
    }

    // Obtiene todos los tipos de campos existentes en la base de datos
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
            // setLoading(false)
        } catch (error) {
            alert(error)
        }
    }

    // Obtiene un listado con los grupos de productos existentes
    const getAllCategories = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_HOME + "groups", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const result = await response.json()
            var arre = []
            result.forEach(ele => {
                var obj = {
                    value: ele.IdGrupo,
                    label: ele.DescripcionGrupo
                }
                arre.push(obj)
                console.log(obj)
            })
            setCategorias(arre)
            setLoading(false)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getAllTypes()
        getAllCategories()
    }, [])

    // Controla la función para añadir un nuevo campo a la entidad
    const addItemCampo = (campoObj) => {
        let oldArray = [...campos]
        oldArray.push(campoObj);
        setCampos([...campos, campoObj])
        let camposP = [...propsCampos];
        let lastIndex = campos.length;
        camposP[lastIndex][4] = campoObj.id;
        setPropsCampos(camposP)
    }

    // Desplega el modal con la previsualización de cada uno de los controles añadidos
    const handleToggleVisible = (item, indice) => {
        setFlag(true)
        setItemModal(item)
        setIndexModal(indice)
    }

    // Controla los valores del Toggle de requerido
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

    // Muestra el control indicado en la previsualización del control 
    const showPrevisualization = (item, index) => {
        if (item?.type != undefined) {
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
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            options={objData}
                            defaultValue={objData[0]}
                        />

                    )
                case 'textarea':
                    return (
                        <textarea className='app-textarea' style={{ resize: 'none', width: '350px', height: '150px' }} placeholder={propsCampos[index][0]} tooltip={propsCampos[index][1]} />
                    )
            }
        }
    }

    // Quita el item del campo 
    const deleteCampo = (index) => {
        var datosAgregados = [...campos];
        datosAgregados.splice(index, 1)
        setCampos(datosAgregados);
    }

    // Controla la función de subir o bajar de nivel 
    const changeLevelCampo = (index, move) => {
        if ((index == 0 && move == -1) || (index == campos.length - 1 && move == 1)) return;
        let newIndex = index + move;
        let camposArray = [...campos]
        let objIndex = camposArray[index];
        let objMoved = camposArray[newIndex];
        camposArray.splice(index, 1, objMoved);
        camposArray.splice(newIndex, 1, objIndex)
        setCampos(camposArray)
    }

    // Guarda el nombre de la entidad
    const handleSaveEntity = async () => {
        try {
            setLoading(true)
            const response = await fetch(process.env.REACT_APP_HOME + "category", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "DescripcionCategoria": entityName, "EstadoCategoria": 1, "UsuarioCreo": authState.me.get().username, "IdGrupo": selectedCategory })
            })
            /* setEntityName("")
            await getItems()
            setShowModal(false) */
            let res = await response.json();
            console.log(res)
            setInsertedId(res.insertId)
            setLoading(false)
            alert("El empleado se guardó exitosamente")
        } catch (error) {
            alert("Ocurrio un error al guardar el empleado" + error)
        }
    }

    const validateAllFieldsHasName = () => {
        let camposArrayAux = [...propsCampos]
        let arrayFiltered = []
        let flag = false;
        camposArrayAux.map((el, index) => {
            if (el[4]) arrayFiltered.push(el)
            //console.log(el)
        })

        arrayFiltered.map((item) => {
            if (!item[1]) flag = true
        })
        return flag;
    }

    const handleSaveAllCampos = async () => {
        let camposArrayAux = [...propsCampos]
        let arrayFiltered = []
        camposArrayAux.map((el, index) => {
            if (el[4]) arrayFiltered.push(el)
        })
        setAllCampos(arrayFiltered);


        arrayFiltered.map((item, index) => {
            try {
                //setLoading(true)
                const response = fetch(process.env.REACT_APP_HOME + "control", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "IdCategoria": insertedIdRef.current, "CaracteristicaDescripcion": item[1], "Nivel": index, "Requerido": Number(item[2]) ? 1 : 0, "Placeholder": item[0], "Tooltip": item[1], "UsuarioCreo": authState.me.get().username, "CaracteristicaTipo": item[4] })
                }).then((res) => {
                    res.json().then((res) => {
                        if (item[4] == 4) {
                            var arrayValues = item[3].split('|');
                            arrayValues.forEach((ele, indice) => {
                                let responseOptions = fetch(process.env.REACT_APP_HOME + "control/detail", {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ "IdCategoria": insertedIdRef.current, "IdCaracteristica": res.message, "Valores": ele, "Nivel": indice })
                                }).then((res) => {
                                    console.log("Campo añadido")
                                }).catch((err) => {
                                    console.log("Algo salió mal al agregar el campo" + err)
                                })
                            })

                        }
                    })
                    /*  */
                }).catch((err) => {
                    console.log("Algo salió mal al agregar el campo" + err)
                })



            } catch (error) {
                alert(error)
            }
        })

        // alert("Campos añadidos exitosamente")

    }

    const cleanFields = () => {
        setEntityName("")
        setPropsCampos(initialArr)
        setCampos([])
    }

    const saveAllFields = async () => {
        if (!campos[0]) {
            return alert("Debes añadir los campos a tu entidad antes de proseguir")
        } else {
            if (validateAllFieldsHasName()) {
                return alert("El campo del nombre es obligatorio")
            } else {
                if (!selectedCategory) {
                    return alert("Debes seleccionar un grupo de categoría para tu entidad")
                } else {
                    await handleSaveEntity();
                    await handleSaveAllCampos();
                    cleanFields();
                }

            }

        }
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
                        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#eee', height: '60px', flexDirection: 'row', marginRight: '50px' }}>
                            <div>
                                <label style={{ margin: ' 0 20px' }}>Nombre de la entidad:</label>
                                <InputText placeholder='Nueva entidad' tooltip='Nueva entidad' onChange={(e) => setEntityName(e.target.value)} />
                            </div>
                            <div>
                                <label style={{ margin: ' 0 20px' }}>Categoría:</label>
                            </div>
                            <div style={{ width: '300px' }}>
                                <Select options={categorias}
                                    placeholder="Selecciona una categoría"
                                    onChange={(e) => setSelectedCategory(e.value)}
                                    //styles={{ width: '250px' }} 
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} />
                            </div>
                            <div style={{ marginLeft: '20px' }}>
                                <Button
                                    type="primary"
                                    value="Guardar entidad"
                                    //onClick={handleSaveEntity}
                                    onClick={saveAllFields}
                                />
                            </div>

                        </div>
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
                                        return (
                                            <>
                                                <View
                                                    isVisible={true}
                                                    zIndex={1}
                                                    animationType="fade"
                                                    style={{ height: 180, width: '95%', margin: '10px 0px', backgroundColor: '#EEE', padding: '10px', position: 'relative' }}>
                                                    <div>
                                                        <div style={{ width: "100%" }}>
                                                            <span style={{ fontWeight: 'bold' }}>Campo de tipo {item.display.toLowerCase()}</span>
                                                            <ButtonIcon
                                                                icon={<i className="icons10-cross" style={{ color: masterState.get().color }}></i>}
                                                                onClick={() => deleteCampo(index)}
                                                                tooltip="Eliminar"
                                                            />
                                                            <ButtonIcon
                                                                icon={<i className="icons10-eye" style={{ color: masterState.get().color }}></i>}
                                                                onClick={() => handleToggleVisible(item, index)}
                                                                tooltip="Previsualizar"
                                                            />
                                                            <ButtonIcon
                                                                icon={<i className="icons10-angle-down" style={{ color: masterState.get().color }}></i>}
                                                                onClick={() => changeLevelCampo(index, 1)}
                                                                tooltip="Bajar nivel"
                                                            />
                                                            <ButtonIcon
                                                                icon={<i className="icons10-angle-up" style={{ color: masterState.get().color }}></i>}
                                                                onClick={() => changeLevelCampo(index, -1)}
                                                                tooltip="Subir nivel"
                                                            />

                                                            <br />
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'flex-start', alignItems: 'stretch', alignItems: 'flex-start' }}>
                                                            <div style={{ flex: '1 0 auto', alignSelf: 'auto', marginTop: '20px' }}>
                                                                <span style={{ margin: '0px 10px' }}>Nombre: </span>
                                                                <input className='app-input-text' placeholder='Nombre' name={index} a_key={1} onChange={onChangeHandler} value={propsCampos[index]?.[1] ?? ""} />
                                                            </div>
                                                            <div style={{ flex: '1 0 auto', alignSelf: 'auto', marginTop: '20px' }}>
                                                                <span style={{ marginRight: '10px' }}>Placeholder: </span>
                                                                <input className='app-input-text' placeholder='Placeholder' name={index} a_key={0} onChange={onChangeHandler} value={propsCampos[index]?.[0] ?? ""} />
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
                                                    <Dialog
                                                        isVisible={flag}
                                                        onBackdropPress={() => setFlag(false)}
                                                        style={{ height: '300px' }}
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