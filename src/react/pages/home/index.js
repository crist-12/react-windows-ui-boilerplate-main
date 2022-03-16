
import { NavPageContainer } from 'react-windows-ui'
import React, { useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import { useAuthState } from '../../stores/AuthStore'
import { useMasterState } from '../../stores/MasterStore'
import useState from 'react-usestateref';
import { PieChart } from 'react-minimal-pie-chart';
import { Pie } from 'react-chartjs-2';
import { VictoryPie, VictoryContainer } from 'victory';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import "../home/index.css";
import logorv from "../../assets/rvlogo.png"
const Palette = require('nice-color-palettes/200');


const Home = () => {

  const authState = useAuthState();
  const masterState = useMasterState();

  const [dashboard, setDashboard, dashboardRef] = useState(null);
  const [colors, setColors, colorsRef] = useState(null);
  const [employees, setEmployees, employeesRef] = useState(null);
  const [graphData, setGraphData, graphDataRef] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardData();

  }, [])


  const getDashboardData = async () => {
    var indice = Math.floor((Math.random() * (200 - 1 + 1)) + 1);
    setColors(Palette[indice]);
    const response = await fetch(process.env.REACT_APP_HOME + "dashboard", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    setDashboard(data[0][0].Cantidad);
    setEmployees(data[0][0].Empleados);
    var graph = [
      { x: "ASIG", y: data[0][0].Asignados },
      { x: "NO ASIG", y: data[0][0].NoAsignado },
      { x: "MNT", y: data[0][0].Mantenimiento },
      { x: "NO DISP", y: data[0][0].NoDisponibles }
    ]
    setGraphData(graph);
    console.log(data)
    setLoading(false);
  }


  return (
    <>
      {
        !loading ?
          <>
            <NavigationWindow />

            <NavPageContainer
              hasPadding={true}
              animateTransition={true}>
              <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                <div style={{ display: "flex", flex: 1, justifyContent: "space-between", marginRight: "40px" }}>
                  <div>
                    <h1>Home</h1>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={logorv} height={"40px"} />
                  </div>
                </div>
                <div className='app-hr' />
              </div>
              <div style={{ flex: 1, display: "flex", marginRight: "30px", marginTop: "30px", flexDirection: "column" }}>
                <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
                  <h3>¡Bienvenido(a), {authState.me.get().username}!</h3>
                </div>
                <div style={{ display: "flex", flex: 1 }}>
                  <div style={{ display: "flex", flex: 1, justifyContent: "center", padding: "20px", alignItems: "center", backgroundColor: "#eee", height: "450px", margin: "0 20px", flexDirection: "column" }}>
                    <h3 style={{ fontWeight: "bold" }}>Gráfica de Estados de Equipos</h3>
                    <VictoryPie
                      //colorScale={colorsRef.current}
                      colorScale={[colorsRef.current[0], colorsRef.current[1], colorsRef.current[2], colorsRef.current[3]]}
                      data={graphDataRef.current}
                      padAngle={({ datum }) => datum.y}
                      innerRadius={100}
                      width={350}
                      id="graph-victory-home"
                      style={{margin: 0, padding: 0}}
                      animate={{ duration: 2000 }}
                      labels={({ datum }) => {
                        switch (datum.y) {
                          case 0:
                            return "";
                          default:
                            return datum.y + " " + datum.x;
                        }
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                    <div style={{ display: "flex", flex: 1, flexDirection: "column", backgroundColor: "#eee", width: "100%", marginBottom: "20px" }}>
                      <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <h1 style={{ fontWeight: "bold" }}>{dashboardRef.current}</h1>
                      </div>
                      <div style={{ display: "flex", flex: 1, alignItems: "flex-start", justifyContent: "center" }}>
                        <h1>Equipos registrados</h1>
                      </div>
                    </div>
                    <div style={{ display: "flex", flex: 1, flexDirection: "column", backgroundColor: "#eee", width: "100%" }}>
                      <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <h1 style={{ fontWeight: "bold" }}>{employeesRef.current}</h1>
                      </div>
                      <div style={{ display: "flex", flex: 1, alignItems: "flex-start", justifyContent: "center" }}>
                        <h1>Empleados activos</h1>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </NavPageContainer>
          </>
          : <></>}
    </>
  );
}

export default Home