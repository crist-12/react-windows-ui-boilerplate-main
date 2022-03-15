
import { NavPageContainer } from 'react-windows-ui'
import React, { useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import { useAuthState } from '../../stores/AuthStore'
import useState from 'react-usestateref';
import { PieChart } from 'react-minimal-pie-chart';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import "../home/index.css";
const Palette = require('nice-color-palettes/200');


const Home = () => {

  const authState = useAuthState();

  const [dashboard, setDashboard] = useState(null);
  const [colors, setColors, colorsRef] = useState(null);
  const [graphData, setGraphData, graphDataRef] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    getNewColorPalette();
    getDashboardData();
    setLoading(false);
  }, [])

  ChartJS.register(ArcElement, Tooltip, Legend);

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
    setDashboard(data[0]);
    var graph = [
      { title: "Asignados", value: data[0][0].Asignados, color: Palette[indice][0] },
      { title: "No Asignados", value: data[0][0].NoAsignado, color: Palette[indice][1] },
      { title: "En Mantenimiento", value: data[0][0].Mantenimiento, color: Palette[indice][2] },
      { title: "No disponibles", value: data[0][0].NoDisponibles, color: Palette[indice][3] }
    ]

    var graph2 = {
      labels: ["Asignados", "No Asignados", "En Mantenimiento", "No disponibles"],
      dataset: [
        {
          label: 'Estado de Equipos',
          data: [data[0][0].Asignados, data[0][0].NoAsignado, data[0][0].Mantenimiento, data[0][0].NoDisponibles],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        }
      ]
    }
    setGraphData(graph2);
    console.log(data)

  }

  const getNewColorPalette = () => {

  }


  const lineWidth = 60;

  return (
    <>
      {
        !loading ?
          <>
            <NavigationWindow />

            <NavPageContainer
              hasPadding={true}
              animateTransition={true}>
              <h1>Home</h1>
              <div className='app-hr' />
              <div style={{ flex: 1, display: "flex", marginRight: "30px", marginTop: "30px", flexDirection: "column" }}>
                <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
                  <h3>¡Bienvenido(a), {authState.me.get().username}!</h3>
                </div>
                <div style={{ display: "flex", flex: 1 }}>
                  <div style={{ display: "flex", flex: 1, padding: "10px", justifyContent: "center", alignItems: "center", backgroundColor: "#eee", height: "450px", margin: "0 20px", flexDirection: "column" }}>
                   
                  </div>
                  <div style={{ display: "flex", flex: 1, padding: "10px", justifyContent: "center", alignItems: "center", backgroundColor: "#eee", height: "150px", margin: "0 20px" }}>

                  </div>
                  <div style={{ display: "flex", flex: 1, padding: "10px", justifyContent: "center", alignItems: "center", backgroundColor: "#eee", height: "150px", margin: "0 20px" }}>

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