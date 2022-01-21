
import { NavPageContainer,Link } from 'react-windows-ui'
import React, { useState, useEffect } from 'react'
import NavigationWindow from '../../components/Navigation'
import { AppTheme } from 'react-windows-ui'
import { ColorPickerItem } from 'react-windows-ui'

const Home = () => {
    return (
      <>
        <NavigationWindow/>

            <NavPageContainer
            hasPadding={true}
            animateTransition={true}>
            <AppTheme
              color={'#16ab9c'}
              scheme={'light'}
              onColorChange={()=> {}}
              onSchemeChange={()=> {}}
            />
            <ColorPickerItem
              defaultChecked
              name="some name"
              color="#0078D7"
              onChange={ () => {}}
            />
            <h1>Home</h1>
            <p>Start adding your fantastic ui here.</p>
            <Link>Components here</Link>
        </NavPageContainer>
    </>
  );
}

export default Home