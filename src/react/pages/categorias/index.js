
import { NavPageContainer,Link, InputText } from 'react-windows-ui'
import React, { useState, useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import { TableView } from 'react-windows-ui'
import "../categorias/index.css"
import { ButtonIcon } from 'react-windows-ui'
import { Dialog, Button} from 'react-windows-ui'

const IconsView = () => {
  return(
    <>
    <ButtonIcon
      icon={<i className="icons10-pencil"></i>}
      onClick={() => {}}
      tooltip="Some tooltip text"
      />
      <ButtonIcon
      icon={<i className="icons10-trash"></i>}
      onClick={() => {}}
      tooltip="Some tooltip text"
      />
      </>
  )
}


const Categoria = () => {

const [showModal, setShowModal] = useState(false);
const [categoria, setCategoria] = useState("")
const [listCat, setlistCat] = useState("")

useEffect(()=> {
  getItems()
}, [])

const addItem = async() => {
      try {
        const response = await fetch(process.env.REACT_APP_HOME+"category", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "DescripcionCategoria" : categoria})
        })
       await setCategoria("")
       setShowModal(false)
       alert("La categoria se guardo exitosamente")
    } catch (error) {
      alert("Ocurrio un error al guardar la categoria")
    }
}

const getItems = async() => {
  try {
    const response = await fetch(process.env.REACT_APP_HOME + "category", {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    })
    console.log("Hola")
    console.log(response)
    //setlistCat(response.data)
  } catch (error) {
    console.log(error)
  }
}
    return (
      <>
        <NavigationWindow/>
            <NavPageContainer
            hasPadding={true}
            animateTransition={true}>

            <h1>Categoría</h1>
            <p>Añada, modifique o elimine categoría de productos</p>
            <div className="app-hr"></div>

            <div style={{margin: '20px 0'}}>
              <Button
                  style={{marginLeft: '30px'}}
                  value="Nueva"
                  onClick={()=> setShowModal(true)}
                  icon={<i className="icons10-plus"></i>} />
            </div>
            <div style={{width: '100%'}}>
            <TableView
              columns={[
                { 'title':'Categoría' },
                { 'title':'Energy (KCal)','showSortIcon': true },
                { 'title':'Color','showSortIcon': false, 'sortable': false },
              ]}
              rows={[
                [ "Computadora", 11845, IconsView() ],
                [ "Impresora", 12867, IconsView()],
                [ "Cámara de Seguridad", 10867, IconsView()]
              ]}
              style= {{width: '100%', backgroundColor: 'blue'}}
            />
            </div>
            <Dialog
              isVisible={showModal}
              onBackdropPress={()=> setShowModal(false)}
              showDropShadow={true}>
                <div style={{ padding: '10px'}}>
                <h3>Nueva Categoría</h3>
                <div className="app-hr"></div>
                <div >
                <p>Nombre de la categoria: </p>
                <input
                  value={categoria}
                  onChange = {e => setCategoria(e.target.value)}
                />
                <Button
                  style={{marginLeft: '30px'}}
                  value="Guardar"
                  onClick={addItem}
                  icon={<i className="icons10-save"></i>} />
                </div>
                </div>
              </Dialog>
        </NavPageContainer>
    </>
  );
}

export default Categoria