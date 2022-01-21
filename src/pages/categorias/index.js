
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
              <p>Nombre de categoría: </p>
              <InputText
                placeholder="Ingrese una categoría..."
                tooltip="Nombre de la categoría"
              />
              <Button
                  style={{marginLeft: '30px'}}
                  value="Nueva"
                  onClick={()=> setShowModal(true)}
                  icon={<i className="icons10-plus"></i>} />
            </div>
            <div style={{width: '100%'}}>
            <TableView
              columns={[
                { 'title':'Fruits' },
                { 'title':'Energy (KCal)','showSortIcon': true },
                { 'title':'Color','showSortIcon': false, 'sortable': false },
              ]}
              rows={[
                [ "Papaya", 11845, IconsView() ],
                [ "Grapes", 12867, IconsView()],
                [ "Apple", 10867, IconsView()]
              ]}
              style= {{width: '100%', backgroundColor: 'blue'}}
            />
            </div>
            <Dialog
              isVisible={showModal}
              onBackdropPress={()=> setShowModal(false)}
              showDropShadow={true}>
                <div style={{height: '30vh'}}>

                </div>
              </Dialog>
        </NavPageContainer>
    </>
  );
}

export default Categoria