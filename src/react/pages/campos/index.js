/**
 * @file Componente - Campos
 * @author Christopher Ortiz
 * @namespace Campos
 * @description Pantalla que permite la creación de las entidades, escogiendo el tipo que utilizará.
 * @version 1.0.0
 */
import { NavPageContainer, LinkCompound, View, ButtonIcon, InputText, Switch, Dialog, Link, Button } from 'react-windows-ui'
import React, { useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import "./styles.css"
import { useMasterState } from '../../stores/MasterStore'
import { useAuthState } from '../../stores/AuthStore'
import Select from 'react-select'
import Loader from 'react-js-loader'
import useState from 'react-usestateref'


const Campos = () => {

    const MAX_FIELDS = 20
    const ITEMS_PER_FIELDS = 5
    const initialArr = new Array(MAX_FIELDS);
    for (var i = 0; i < MAX_FIELDS; i++) {
        initialArr[i] = new Array(ITEMS_PER_FIELDS);
    }

    const visibleDialogs = new Array(MAX_FIELDS).fill(false);

    /**
     * setTypes Hook encargado de traer los controles o los campos de cada entidad
     * @function setTypes
     * @memberof Campos
     * @return types {Array}
     * @inner
     */
    const [types, setTypes] = React.useState([])
    /**
     * setLoading Hook encargado de manejar el estado de carga de los controles o los campos de cada entidad
     * @function setLoading
     * @memberof Campos
     * @return types {boolean}
     * @inner
     */
    const [loading, setLoading] = React.useState(false)
    /**
     * Hook encargado de traer almacenar los campos que se están creando para la entidad
     * @function setCampos
     * @memberof Campos
     * @return types {Array}
     * @inner
     */
    const [campos, setCampos] = React.useState([])
    /**
     * setDialog Hook encargado de traer almacenar los campos que se están creando para la entidad
     * @function setDialog
     * @deprecated
     * @memberof Campos
     * @return types {Array}
     * @inner
     */
    const [dialog, setDialog] = React.useState(visibleDialogs)
    /**
     * setPropsCampos Hook encargado de almacenar las propiedades que tendrá cada campo
     * @function setPropsCampos
     * @memberof Campos
     * @return types {Array}
     * @inner
     */
    const [propsCampos, setPropsCampos] = React.useState(initialArr)
    /**
     * Hook encargado de almacenar el item que mostrará en el modal
     * @function setItemModal
     * @memberof Campos
     * @return itemModal {Object}
     * @inner
     */
    const [itemModal, setItemModal] = React.useState()
    /**
     * Hook encargado de almacenar el índice/código del item/elemento que mostrará en el modal
     * @function setIndexModal
     * @memberof Campos
     * @return indexModal {Object}
     * @inner
     */
    const [indexModal, setIndexModal] = React.useState()
    /**
     * Hook encargado de almacenar el item que mostrará en el modal
     * @function setCategorias
     * @memberof Campos
     * @return itemModal {Object}
     * @inner
     */
    const [categorias, setCategorias] = React.useState()
    /**
     * Hook encargado de almacenar el nombre de la entidad a registrar
     * @function setEntityName
     * @memberof Campos
     * @return entityName {Object}
     * @inner
     */
    const [entityName, setEntityName] = React.useState()
    /**
     * Hook encargado de almacenar el id que se acaba de insertar en la base de datos, esto para luego usarlo en la creación de los detalles de esa entidad
     * @function setInsertedId
     * @memberof insertedId
     * @return itemModal {Object}
     * @inner
     */
    const [insertedId, setInsertedId, insertedIdRef] = useState()
    /**
     * Hook encargado de almacenar todos los campos a registrar
     * @function setAllCampos
     * @memberof Campos
     * @return allCampos {Object}
     * @inner
     */
    const [allCampos, setAllCampos] = React.useState()
    /**
     * Hook encargado de almacena la categoría/grupo a la que pertenece la entidad
     * @function setSelectedCategory
     * @memberof Campos
     * @return selectedCategory {Object}
     * @inner
     */
    const [selectedCategory, setSelectedCategory] = React.useState()
    /**
     * Hook encargado de manejar el estado del Dialog de previsualización
     * @function setFlag
     * @memberof Campos
     * @return flag {boolean}
     * @inner
     */
    const [flag, setFlag] = React.useState(false)
    const masterState = useMasterState()
    const authState = useAuthState()

    /**
     * Maneja el evento onChange de los controles o campos de cada entidad para almacenarlos posteriormente
     * @function onChangeHandler
     * @memberof Campos
     * @return void
     * @inner
     */
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

    /**
     * Obtiene todos los tipos de datos con los que se pueden crear las entidades
     * @function getAllTypes
     * @memberof Campos
     * @return void
     * @inner
     */
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
    /**
     * Obtiene un listado con los grupos de productos existentes
     * @function onChangeHandler
     * @memberof Campos
     * @return void
     * @inner
     */
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

    /**
     * Almacena un nuevo item al arreglo de los campos para luego almacenarlos
     * @function addItemCampo
     * @memberof Campos
     * @return void
     * @inner
     */
    const addItemCampo = (campoObj) => {
        let oldArray = [...campos]
        oldArray.push(campoObj);
        setCampos([...campos, campoObj])
        let camposP = [...propsCampos];
        let lastIndex = campos.length;
        camposP[lastIndex][4] = campoObj.id;
        setPropsCampos(camposP)
    }

    /**
     * Maneja el dialog para la previsualización de los campos a registrar
     * @function handleToggleVisible
     * @memberof Campos
     * @return void
     * @inner
     */
    const handleToggleVisible = (item, indice) => {
        setFlag(true)
        setItemModal(item)
        setIndexModal(indice)
    }

    /**
     * Maneja los valores del campo de requerido
     * @function handleToggleSwitch
     * @memberof Campos
     * @return void
     * @inner
     */
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

    /**
     * Se encarga de mostrar el control indicado (input text, number, date, long text, select) en la previsualización
     * @function showPrevisualization
     * @memberof Campos
     * @return void
     * @inner
     */
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

    /**
     * Elimina el campo en cuestión de los ítems seleccionados
     * @function deleteCampo
     * @memberof Campos
     * @return void
     * @inner
     */
    const deleteCampo = (index) => {
        var datosAgregados = [...campos];
        datosAgregados.splice(index, 1)
        setCampos(datosAgregados);
    }

    /**
    * Controla la función de subir/bajar nivel de los campos
    * @function changeLevelCampo
    * @memberof Campos
    * @return void
    * @inner
    */
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

    /**
     * Función encargada de manejar el guardado de la nueva entidad
     * @function handleSaveEntity
     * @memberof Campos
     * @async
     * @return void
     * @inner
     */
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
    /**
     * Valida que todos los campos tengan valores antes de guardar la entidad
     * @function validateAllFieldsHasName
     * @memberof Campos
     * @return void
     * @inner
     */
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
    /**
     * Luego de guardar la entidad, se deben guardar los campos por separado, esta función se encarga de hacerlo
     * @function handleSaveAllCampos
     * @memberof Campos
     * @return void
     * @inner
     */
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
    /**
     * AFunción encargada de limpiar los campos luegos de ser guardados
     * @function cleanFields
     * @memberof Campos
     * @return void
     * @inner
     */
    const cleanFields = () => {
        setEntityName("")
        setPropsCampos(initialArr)
        setCampos([])
    }
    /**
     * Función que funciona como manejador de otros métodos de guardado de todos los campos pertenecientes a la entidad
     * @function saveAllFields
     * @memberof Campos
     * @return void
     * @inner
     */
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
                loading ? <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}>
                    <Loader type="spinner-circle" bgColor={"#000"} title={"Cargando..."} color={'#000'} size={100} />
                </div> : <>
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
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 0,
                                        colors: {
                                            ...theme.colors,
                                            primary: masterState.get().color,
                                            primary25: masterState.get().color
                                        },
                                    })}
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
                                                    <div className='view-container'>
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
                                                                <span style={{ margin: '0 10px' }}>Placeholder: </span>
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