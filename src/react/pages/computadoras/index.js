
import { NavPageContainer, Link, InputText, NavPageContainerRight, LinkCompound } from 'react-windows-ui'
import React, { useState, useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import RightMenu from '../../components/RightMenu'
import { useInput } from '../../hooks/useInput'
import { useState as useStateRef } from '@hookstate/core'
import MaterialTable from 'material-table'
import { Table } from 'react-bootstrap'
import "../computadoras/index.css"
//import 'bootstrap/dist/css/bootstrap.min.css';

const Computadora = () => {

    const [controls, setControls] = useState([]);
    const [loading, setLoading] = useState(true)
    const [tableData, setTableData] = useState();


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

    useEffect(() => {
        getTableData()
    }, [])

    const getTableData = async () => {
        try {
            const response = await fetch("http://localhost:9000/control/equipos", {
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
            console.log(arre)
            setTableData(arre)
            console.log(controls)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }

    }

    const showStateSpan = (state) => {
        switch (state) {
            case "Sin asignar":
                return (
                    <div style={{ padding: "5px", backgroundColor: "#17A2B8", width: "100px", borderRadius: "20px", color: "white", fontWeight: "bold", justifyContent: "center", alignItems: "items", display: "flex" }}>
                        <span>{state}</span>
                    </div>
                )
            case "Asignada":
                return (
                    <div style={{ padding: "5px", backgroundColor: "#28A745", width: "100px", borderRadius: "20px", color: "white", fontWeight: "bold", justifyContent: "center", alignItems: "items", display: "flex" }}>
                        <span>{state}</span>
                    </div>
                )
            case "En mantenimiento":
                return (
                    <div style={{ padding: "5px", backgroundColor: "#FFC107", width: "160px", borderRadius: "20px", color: "white", fontWeight: "bold", justifyContent: "center", alignItems: "items", display: "flex" }}>
                        <span>{state}</span>
                    </div>
                )
            case "No disponible":
                return (
                    <div style={{ padding: "5px", backgroundColor: "#DC3545", width: "100px", borderRadius: "20px", color: "white", fontWeight: "bold", justifyContent: "center", alignItems: "items", display: "flex" }}>
                       <span>{state}</span>
                    </div>
                )
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

                            <h1>Computadoras</h1>
                            <p>Asigna equipos a colaboradores.</p>
                            <div className="app-hr"></div>
                            <div style={{ marginRight: "30px" }}>
                                <table style={{ width: '100%' }} className="styled-table">
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
                                            tableData.map(ele => {
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
                                                        <td>

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

export default Computadora