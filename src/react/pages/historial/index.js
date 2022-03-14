
import { NavPageContainer, Link } from 'react-windows-ui'
import React, { useState, useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import "../historial/index.css"

const Historial = () => {

    const [assignmentData, setAssignmentData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllAssignmentData()
    }, []);


    const getAllAssignmentData = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_HOME + "assignment/history", {
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
            {
                loading ? <></> :
                    <>
                        <NavigationWindow />
                        <NavPageContainer
                            hasPadding={true}
                            animateTransition={true}>

                            <h1>Historial de Asignaciones</h1>
                            <p>Revisa y analiza las asignaciones de los equipos.</p>
                            <div className='app-hr' />
                            <div style={{ display: "flex", flex: 1, marginRight: "30px", flexDirection: "column" }}>
                                <div style={{ marginTop: "15px" }}>
                                    <label>Buscar</label>
                                    <input className='app-input-text' id="search-input-table" placeholder='Buscar...' style={{ marginLeft: "20px" }} onKeyUp={searchTableAll} />
                                </div>
                                <table style={{ width: '100%' }} className="styled-table" id="table-products">
                                    <thead>
                                        <tr>
                                            <th>Equipo</th>
                                            <th>Nombre Empleado</th>
                                            <th>Detalle</th>
                                            <th>Fecha de Asignación</th>
                                            <th>Fecha de Remoción</th>
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
                                                        <td>
                                                            {ele.FechaRemocion}
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
                        </NavPageContainer>
                    </>
            }
        </>
    );
}

export default Historial