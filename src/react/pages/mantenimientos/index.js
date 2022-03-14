
import { NavPageContainer, Link, Button } from 'react-windows-ui'
import React, { useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import useState from 'react-usestateref'
import Modal from '../../components/Modal';
import { triggerBase64Download } from 'react-base64-downloader'

const Mantenimiento = () => {

    const [maintenances, setMaintenances, maintenancesRef] = useState()
    const [modalImg, setModalImg] = useState(false)
    const [currentImage, setCurrentImage, currentImageRef] = useState()

    useEffect(() => {
        getMaintenanceRecords();
    }, [])

    const getMaintenanceRecords = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_HOME + "maintenance", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setMaintenances(data)
        } catch (error) {
            alert("Ha ocurrido un error al obtener los datos " + error)
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

    return (
        <>
            <NavigationWindow />
            <NavPageContainer
                hasPadding={true}
                animateTransition={true}>
                <Modal showOverlay={true} show={modalImg} onClose={() => setModalImg(false)}>
                    <Modal.Header>
                        <Modal.Title>Visualizador de imágenes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={currentImageRef.current} width="700px" height="auto" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button value='Guardar imagen' onClick={() => { triggerBase64Download(currentImageRef.current, "IMG-" + Date.now()) }} />
                        <Button value="Cerrar" onClick={() => setModalImg(false)} />
                    </Modal.Footer>
                </Modal>
                <h1>Mantenimientos</h1>
                <p>Analiza los últimos movimientos realizados en el sistema.</p>
                <div style={{ display: "flex", flex: 1, marginRight: "30px", flexDirection: "column" }}>
                    <div style={{ marginTop: "15px", display: "flex", flex: 1 }}>
                        <div style={{ flex: 1 }}>
                            <label>Buscar</label>
                            <input className='app-input-text' id="search-input-table" placeholder='Buscar...' style={{ marginLeft: "20px" }} onKeyUp={searchTableAll} />
                        </div>
                    </div>
                    <table style={{ width: '100%' }} className="styled-table" id="table-products">
                        <thead>
                            <tr>
                                <th>Equipo</th>
                                <th>Tipo de Mantenimiento</th>
                                <th>Fecha de Mantenimiento</th>
                                <th>Fecha de Recibimiento</th>
                                <th>Factura</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                maintenancesRef.current?.map(item => {
                                    return (
                                        <tr key={item.IdMantenimiento}>
                                            <td>{item.Equipo}</td>
                                            <td>{item.FechaMantenimiento}</td>
                                            <td>{item.FechaRecibida}</td>
                                            <td>{item.DescripcionTipoMantenimiento}</td>
                                            <td><a style={{textDecoration: "underline", color: "blue"}} onClick={()=> {setCurrentImage(item.FacturaMantenimiento); setModalImg(true)}}>Ver imagen</a></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </NavPageContainer>
        </>
    );
}

export default Mantenimiento