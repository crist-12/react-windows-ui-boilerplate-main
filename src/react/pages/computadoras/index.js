
import { NavPageContainer, Link, InputText, NavPageContainerRight, LinkCompound, RadioButton, Button } from 'react-windows-ui'
import React, { useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import RightMenu from '../../components/RightMenu'
import { useInput } from '../../hooks/useInput'
import useState from 'react-usestateref'
import { useMasterState } from '../../stores/MasterStore'
import MaterialTable from 'material-table'
import { Table } from 'react-bootstrap'
import "../computadoras/index.css"
import Modal from '../../components/Modal';
import { triggerBase64Download } from 'react-base64-downloader'
import Select from 'react-select'
//import 'bootstrap/dist/css/bootstrap.min.css';


const Computadora = () => {

    var initialArr = [20][7];

    const [controls, setControls] = React.useState([]);
    const [loading, setLoading] = React.useState(true)
    const [tableData, setTableData] = React.useState();
    const [assignmentData, setAssignmentData] = React.useState();
    const [respuesta, setRespuesta, respuestaRef] = useState([])
    const [mode, setMode] = React.useState('T')
    const [showModal, setShowModal] = React.useState(false)
    const [factura, setFactura] = React.useState(false)
    const [id, setId, idRef] = useState()
    const [modalCancel, setModalCancel] = React.useState(false)
    const [modalInfo, setModalInfo] = React.useState(false)
    const [filteredComputer, setFilteredComputer, filteredComputerRef] = useState()
    const [modalImg, setModalImg] = React.useState(false)
    const [currentImage, setCurrentImage] = useState()
    const [modalActualizar, setModalActualizar] = React.useState(false)
    const [infoRaw, setInfoRaw, infoRawRef] = useState()
    const [computerObject, setComputerObject, computerObjectRef] = useState()
    const [options, setOptions, optionsRef] = useState()

    const columnas = [
        {
            title: 'Id',
            field: 'id',
            hidden: true
        },
        {
            title: 'Equipo',
            field: 'equipo'
        },
        {
            title: 'Estado',
            field: 'estado'
        }
    ]

    const masterState = useMasterState();

    useEffect(() => {
        getTableData()
        getAllAssignmentData()
    }, [])

    const getTableData = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_HOME + "control/equipos", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const result = await response.json()
            var arre = []
            result.forEach(ele => {
                var obj = {
                    id: ele.IdEquipo,
                    equipo: ele.Equipo,
                    estado: ele.DescripcionEstado
                }
                arre.push(obj)
            })
            setTableData(arre)
        } catch (error) {
            console.log(error)
        }

    }

    const getAllAssignmentData = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_HOME + "assignment/", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const result = await response.json()
            setAssignmentData(result)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const showStateSpan = (state) => {
        switch (state) {
            case "Sin asignar":
                return (
                    /*<div style={{ padding: "5px", backgroundColor: "#17A2B8", width: "100px", borderRadius: "20px", color: "white", fontWeight: "bold", justifyContent: "center", alignItems: "items", display: "flex" }}>
                        <span>{state}</span>
                    </div>*/
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ height: "10px", width: "10px", background: "red", borderRadius: "10px", marginRight: "10px" }}>
                        </div>
                        <span>{state}</span>
                    </div>
                )
            case "Asignada":
                return (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ height: "10px", width: "10px", background: "green", borderRadius: "10px", marginRight: "10px" }}>
                        </div>
                        <span>{state}</span>
                    </div>
                )
            case "En mantenimiento":
                return (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ height: "10px", width: "10px", background: "yellow", borderRadius: "10px", marginRight: "10px" }}>
                        </div>
                        <span>{state}</span>
                    </div>
                )
            case "No disponible":
                return (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ height: "10px", width: "10px", background: "blue", borderRadius: "10px", marginRight: "10px" }}>
                        </div>
                        <span>{state}</span>
                    </div>
                )
        }
    }

    const searchTableAll = () => {
        var searchBox = document.getElementById('search-input-table');
        var table = document.getElementById("table-products");
        var trs = table.tBodies[0].getElementsByTagName("tr");
        var filter = searchBox.value.toUpperCase();
        for (var rowI = 0; rowI < trs.length; rowI++) {
            var tds = trs[rowI].getElementsByTagName("td");
            trs[rowI].style.display = "none";
            for (var cellI = 0; cellI < tds.length; cellI++) {
                if (tds[cellI].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    trs[rowI].style.display = "";
                    continue;
                }
            }
        }
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const handleInputControlValue = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log(base64)
        setFactura(base64)
    }

    const updateMaintenanceStatus = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_HOME + "assignment/receive/" + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ FacturaMantenimiento: factura })
            })

            const result = await response.json()
            //setAssignmentData(result)
            // setLoading(false)
            await changeComputerStatus(2);
            //alert("Se ha actualizado el estado del equipo")

        } catch (error) {
            console.log(error)
            alert("Ha ocurrido un error")
        }
        setShowModal(false)
        await getTableData()
        await getAllAssignmentData()
    }

    const changeComputerStatus = async (status) => {
        try {
            const response = await fetch(process.env.REACT_APP_HOME + "machines/status/" + idRef.current, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    TipoEstado: status
                })
            })
            const result = await response.json()
            console.log(result)
            alert("Se ha actualizado el estado del equipo")
            if (status == 4 || status == 1) {
                await deleteAssignmentRow()
                setModalCancel(false);
                await getAllAssignmentData()
                await getTableData()
               // window.location.reload()
            }
        } catch (error) {
            alert(error)
        }
    }

    const deleteAssignmentRow = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_HOME + "assignment/" + idRef.current, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const result = await response.json()
            console.log(result)
            // alert("Asignación eliminada exitosamente")
            //getAllComputersRegistered()
        } catch (error) {
            alert(error)
        }
    }

    const getComputerDetails = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_HOME + "machines/" + idRef.current, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const result = await response.json()
            setFilteredComputer(result);
            console.log(result)
        } catch (error) {
            alert(error)
        }
    }

    const handleDetailsVisualization = async (id) => {
        setId(id)
        await getComputerDetails()
        setModalInfo(true)
    }

    const updateComputerInfo = async (answer, caracteristica) => {
        try {
            const response = await fetch(process.env.REACT_APP_HOME + "machines/" + caracteristica, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Respuesta: answer,
                    IdEquipoIngresado: idRef.current
                })
            })
        } catch (error) {
            alert(error)
        }
    }

    const handleUpdateProcess = async () => {
        try {
            infoRawRef.current.map((elemento) => {
             updateComputerInfo(elemento.Respuesta, elemento.IdCaracteristica)
            })
        } catch (error) {
            return alert(error)
        }
        alert("Se ha actualizado la información del equipo");
        await getAllAssignmentData()
        await getTableData()
    }

    const getComputerInfoRaw = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_HOME + "machines/update/" + idRef.current, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const result = await response.json()
            setInfoRaw(result);
            //console.log(result)
            var arrayObj = [];
            result.map((item) => {
                var indice = item.IdCaracteristica
                var auxArray = []
                for (const [key, value] of Object.entries(item)) {
                    auxArray[key] = value;
                }
                arrayObj.push(auxArray);
            })
            setComputerObject(arrayObj)
            console.log(computerObjectRef.current)
        } catch (error) {
            alert(error)
        }
    }

    const handleUpdateClick = async (id) => {
        setId(id)
        setModalActualizar(true);
        await getOptions()
        await getComputerInfoRaw();
        // console.log(infoRawRef.current)
    }

    const handleChangeInputValue = (e) => {
        var auxArray = [...infoRaw]
        auxArray[e.target.id]["Respuesta"] = e.target.value;
        setInfoRaw(auxArray);
        console.log(computerObjectRef.current)
    }

    const handleInputControlValueAct = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        var auxArray = [...infoRaw]
        auxArray[e.target.id]["Respuesta"] = base64;
        setInfoRaw(auxArray);
        console.log(computerObjectRef.current)
        console.log(e)
    }

    const handleSelectHasChanged = (e) => {
        var auxArray = [...infoRaw]
        auxArray[e.key]["Respuesta"] = e.value;
        setInfoRaw(auxArray);
        console.log(infoRawRef.current[e.key])
        console.log(e)
        //console.log(e)
    }


    const showControls = (item, index) => {
        var req = item.Requerido.data[0];
        if (req == 1) req = true; else req = false;
        switch (item.caracteristicatipo) {
            case 1: //El elemento es un campo texto
                return (
                    <div>
                        <p>{item.CaracteristicaDescripcion}{req ? <label style={{ color: "red" }}>*</label> : <></>}</p>
                        <input className='app-input-text' value={infoRawRef.current[index].Respuesta} id={index} onChange={handleChangeInputValue} required={req} />
                    </div>
                )
            case 2: //El elemento es un campo numérico
                return (
                    <div>
                        <p>{item.CaracteristicaDescripcion}{req ? <label style={{ color: "red" }}>*</label> : <></>}</p>
                        <input className='app-input-text' type="number" step={0.01} value={infoRawRef.current[index].Respuesta} onChange={handleChangeInputValue} id={item.IdCaracteristica} required={req} />
                    </div>
                )
            case 5: //El elemento es un campo de fecha
                return (
                    <div>
                        <p>{item.CaracteristicaDescripcion}{req ? <label style={{ color: "red" }}>*</label> : <></>}</p>
                        <input className='app-input-text' type="date" value={infoRawRef.current[index].Respuesta} onChange={handleChangeInputValue} id={item.IdCaracteristica} required={req} />
                    </div>
                )
            case 6: //El elemento es un campo de texto largo
                return (
                    <div>
                        <p>{item.CaracteristicaDescripcion}{req ? <label style={{ color: "red" }}>*</label> : <></>}</p>
                        <textarea className='app-textarea' type="date" value={infoRawRef.current[index].Respuesta} onChange={handleChangeInputValue} id={item.IdCaracteristica} required={req} />
                    </div>
                )
            case 3: //El elemento es un campo de imagen
                return (
                    <div style={{ margin: "20px 0px" }}>
                        <p>{item.CaracteristicaDescripcion}{req ? <label style={{ color: "red" }}>*</label> : <></>}</p>
                        <input type="file" id={index} required={req} onChange={handleInputControlValueAct} accept="image/*" />
                        {
                            infoRawRef.current[index].Respuesta.length > 1 ?
                                <img src={infoRawRef.current[index].Respuesta} width="100px" height="auto" style={{ marginLeft: "20px" }} /> :
                                <p>Sin información</p>
                        }

                    </div>
                )
            case 4: //El elemento es un campo de seleccion
                var arrayAux = options.filter(ele => ele.key == item.IdCaracteristica)
                //ar value = 
                var dvalue = {
                    value: parseInt(infoRawRef.current[index].Respuesta),
                    label: infoRawRef.current[index].OpcionDescripcion
                }
                return (
                    <div style={{ margin: "15px 0px" }}>
                        <p>{item.CaracteristicaDescripcion}{req ? <label style={{ color: "red" }}>*</label> : <></>}</p>
                        <div style={{ margin: "10px 0" }}>
                            <Select
                                id={item.IdCaracteristica}
                                defaultValue={dvalue}
                                menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                options={arrayAux}
                                onChange={handleSelectHasChanged}
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                        ...theme.colors,
                                        primary: masterState.get().color,
                                        primary25: masterState.get().color
                                    },
                                })}
                            />
                        </div>
                    </div>
                )
        }
    }

    const getOptions = async (id) => {
        try {
            const response = await fetch(process.env.REACT_APP_HOME + "control/options/" + 1, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const result = await response.json()
            var arre = []
            result.forEach(ele => {
                var obj = {
                    value: ele.IdOpcion,
                    label: ele.OpcionDescripcion,
                    key: ele.IdCaracteristica
                }
                arre.push(obj)
                //console.log(obj)
            })
            setOptions(arre)
        } catch (error) {
            alert(error)
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
                            <Modal showOverlay={true} show={showModal} onClose={() => setShowModal(false)}>
                                <Modal.Header>
                                    <Modal.Title>Recibir de Mantenimiento</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {/* <img src={currentImageRef.current} width="700px" height="auto" /> */}
                                    <p>DETALLES DE RECIBIMIENTO</p>
                                    <div className='app-hr' />
                                    <p>FECHA DE RECIBIMIENTO: {new Date().toLocaleDateString()}</p>
                                    <p>FACTURA: </p>
                                    <input type={"file"} onChange={handleInputControlValue} />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button value="Aceptar" onClick={() => updateMaintenanceStatus()} />
                                    <Button value="Cerrar" onClick={() => setShowModal(false)} />
                                </Modal.Footer>
                            </Modal>

                            <Modal showOverlay={true} show={modalInfo} onClose={() => setModalInfo(false)} size={"lg"}>
                                <Modal.Header>
                                    <Modal.Title>Datos del equipo</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {/* <img src={currentImageRef.current} width="700px" height="auto" /> */}
                                    <p>DETALLES DEL EQUIPO</p>
                                    <div className='app-hr' />
                                    {
                                        filteredComputerRef.current?.map(ele => {
                                            if (ele.CaracteristicaTipo == 3) {
                                                return (<>
                                                    {
                                                        ele.Respuesta.length > 1000 ?
                                                            <p><span style={{ fontWeight: "bold" }}>{ele.CaracteristicaDescripcion}</span>: <a style={{ textDecoration: "underline", color: "blue" }} onClick={() => { setModalImg(true); setCurrentImage(ele.Respuesta) }}>Ver imagen</a></p>
                                                            : <p><span style={{ fontWeight: "bold" }}>{ele.CaracteristicaDescripcion}</span>: ---</p>
                                                    }
                                                    <Modal showOverlay={true} show={modalImg} onClose={() => setModalImg(false)}>
                                                        <Modal.Header>
                                                            <Modal.Title>Visualizador de imágenes</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <img src={currentImage} width="700px" height="auto" />
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button value='Guardar imagen' onClick={() => { triggerBase64Download(currentImage, "IMG-" + Date.now()) }} />
                                                            <Button value="Cerrar" onClick={() => setModalImg(false)} />
                                                        </Modal.Footer>
                                                    </Modal>
                                                </>)
                                            }
                                            return (
                                                <>
                                                    <p><span style={{ fontWeight: "bold" }}>{ele.CaracteristicaDescripcion}</span>: {ele.Respuesta}</p>
                                                </>
                                            )
                                        })
                                    }
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button value="Ok" onClick={() => setModalInfo(false)} />
                                </Modal.Footer>
                            </Modal>

                            <Modal showOverlay={true} show={modalCancel} onClose={() => setModalCancel(false)}>
                                <Modal.Header>
                                    <Modal.Title>Dar de baja</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div style={{ display: 'flex' }}>
                                        <i className="icons10-exclamation-mark" style={{ color: '#faca2a', fontSize: "70px" }} />
                                        <div style={{ marginLeft: 25, justifyContent: "center", alignItems: "center", display: "flex" }}>
                                            <label>Estás a punto de dar de baja esta computadora, ¿estás seguro(a) que deseas continuar?</label>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button value='Si, quiero dar de baja' onClick={() => { changeComputerStatus(4); }} />
                                    <Button value="No, mantener estado actual" onClick={() => setModalCancel(false)} />
                                </Modal.Footer>
                            </Modal>

                            <Modal showOverlay={true} show={modalActualizar} onClose={() => setModalActualizar(false)} size={"lg"}>
                                <Modal.Header>
                                    <Modal.Title>Actualizar equipo</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div style={{ display: 'flex', flexDirection: "column" }}>
                                        <p>DATOS DEL EQUIPO</p>
                                        <div className='app-hr' />
                                        {
                                            infoRawRef.current?.map((item, index) => {
                                                return showControls(item, index)
                                                //  if(item.Respuesta.length > 1000) return;
                                                // return (
                                                //     <>
                                                //         {/* <p><span style={{ fontWeight: "bold" }}>{item.CaracteristicaDescripcion}</span>: {item.Respuesta}</p> */}
                                                //         {
                                                //             showControls(item)
                                                //         }
                                                //     </>
                                                // )
                                            })
                                        }
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button value="Actualizar" onClick={handleUpdateProcess} />
                                    <Button value="Cancelar" onClick={() => setModalActualizar(false)} />
                                </Modal.Footer>
                            </Modal>

                            <h1>Computadoras</h1>
                            <p>Asigna equipos a colaboradores.</p>
                            <div className="app-hr"></div>
                            <div>
                                <span style={{ fontWeight: "bold" }}>Modo</span>
                                <br />
                                <div style={{ display: "flex", margin: "15px 0px" }}>
                                    <div style={{ marginRight: "15px" }}>
                                        <RadioButton name="radio" label='Todos los equipos' onChange={() => setMode('T')} defaultChecked />
                                    </div>
                                    <div>
                                        <RadioButton name="radio" label='Equipos asignados' onChange={() => setMode('A')} />
                                    </div>
                                </div>
                            </div>
                            {
                                mode === 'T' ?
                                    <div style={{ marginTop: "15px" }}>
                                        <div style={{ marginRight: "30px", marginTop: "15px" }}>
                                            <div style={{ marginTop: "15px" }}>
                                                <label>Buscar</label>
                                                <input className='app-input-text' id="search-input-table" placeholder='Buscar...' style={{ marginLeft: "20px" }} onKeyUp={searchTableAll} />
                                            </div>
                                            <table style={{ width: '100%' }} className="styled-table" id="table-products">
                                                <thead>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Equipo</th>
                                                        <th>Estado</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tableData ? tableData.map(ele => {
                                                            return (
                                                                <tr>
                                                                    <td>
                                                                        {ele.id}
                                                                    </td>
                                                                    <td>
                                                                        {ele.equipo}
                                                                    </td>
                                                                    <td style={{ display: "flex", justifyContent: "center" }}>
                                                                        {
                                                                            showStateSpan(ele.estado)
                                                                        }
                                                                    </td>
                                                                    <td style={{ justifyContent: "center" }}>
                                                                        {
                                                                            //  ele.estado === "En mantenimiento" ?
                                                                            <div style={{ display: "flex", justifyContent: 'center' }}>
                                                                                <button className='app-button animate primary' style={{ marginRight: "10px" }} onClick={() => handleDetailsVisualization(ele.id)}>Ver detalles</button>
                                                                                <button className='app-button animate primary' style={{ marginRight: "10px" }} onClick={() => handleUpdateClick(ele.id)}>Actualizar</button>
                                                                                {ele.estado === "En mantenimiento" ?
                                                                                    <>
                                                                                        <button className='app-button animate primary' style={{ marginRight: "10px" }} onClick={() => { setShowModal(true); setId(ele.id) }}>Recibir de Mantenimiento</button>
                                                                                    </> : <></>}
                                                                                {
                                                                                    ele.estado != "No disponible" ?
                                                                                        <>
                                                                                            <button className='app-button animate primary' style={{ marginRight: "10px" }} onClick={() => setModalCancel(true)}>Dar de baja</button>
                                                                                        </> : <></>
                                                                                }
                                                                            </div>
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        : <></>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> :
                                    <div>
                                        <div style={{ marginTop: "15px" }}>
                                            <label>Buscar</label>
                                            <input className='app-input-text' id="search-input-table" placeholder='Buscar...' style={{ marginLeft: "20px" }} onKeyUp={searchTableAll} />
                                        </div>
                                        <div style={{ marginRight: "30px" }}>
                                            <table style={{ width: '100%' }} className="styled-table" id="table-products">
                                                <thead>
                                                    <tr>
                                                        <th>Equipo</th>
                                                        <th>Nombre Empleado</th>
                                                        <th>Detalle</th>
                                                        <th>Fecha de Asignación</th>
                                                        <th>Incluye Mochila</th>
                                                        <th>Incluye Mouse</th>
                                                        <th>Incluye Cargador</th>
                                                        <th>Incluye Teclado</th>
                                                        <th>Incluye WebCam</th>
                                                        <th>Área</th>
                                                        <th>Ciudad</th>
                                                        <th>Sucursal</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        assignmentData.map(ele => {
                                                            return (
                                                                <tr>
                                                                    <td>
                                                                        {ele.Equipo}
                                                                    </td>
                                                                    <td>
                                                                        {ele.NombreEmpleado}
                                                                    </td>
                                                                    <td>
                                                                        {ele.DetalleAsignacion}
                                                                    </td>
                                                                    <td>
                                                                        {ele.FechaAsignacion}
                                                                    </td>
                                                                    {
                                                                        ele.IncluyeMochila.data == "1" ?
                                                                            <td style={{ color: "green", fontWeight: "bold", fontSize: "20px" }}>✓</td>
                                                                            :
                                                                            <td style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}>x</td>
                                                                    }
                                                                    {
                                                                        ele.IncluyeMouse.data == "1" ?
                                                                            <td style={{ color: "green", fontWeight: "bold", fontSize: "20px" }}>✓</td>
                                                                            :
                                                                            <td style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}>x</td>
                                                                    }
                                                                    {
                                                                        ele.IncluyeCargador.data == "1" ?
                                                                            <td style={{ color: "green", fontWeight: "bold", fontSize: "20px" }}>✓</td>
                                                                            :
                                                                            <td style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}>x</td>
                                                                    }
                                                                    {
                                                                        ele.IncluyeTeclado.data == "1" ?
                                                                            <td style={{ color: "green", fontWeight: "bold", fontSize: "20px" }}>✓</td>
                                                                            :
                                                                            <td style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}>x</td>
                                                                    }
                                                                    {
                                                                        ele.IncluyeWebCam.data == "1" ?
                                                                            <td style={{ color: "green", fontWeight: "bold", fontSize: "20px" }}>✓</td>
                                                                            :
                                                                            <td style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}>x</td>
                                                                    }
                                                                    <td>
                                                                        {ele.DescripcionArea}
                                                                    </td>
                                                                    <td>
                                                                        {ele.NombreCiudad}
                                                                    </td>
                                                                    <td>
                                                                        {ele.NombreSucursal}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                            }

                        </NavPageContainer>
                    </>
            }
        </>
    );


}

export default Computadora