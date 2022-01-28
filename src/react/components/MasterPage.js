import { NavPageContainer,Link } from 'react-windows-ui'
import React, { useState, useEffect } from 'react'
import NavigationWindow from '../components/Navigation'
import { useMasterState } from '../stores/MasterStore'

const MasterPage = () => {

    const masterState = useMasterState();

    return (
      <>
        <NavigationWindow/>
            <NavPageContainer
            hasPadding={true}
            animateTransition={true}>
            <h1>{masterState.get().name}</h1>
            <p>{masterState.get().name}</p>
            <div className="app-hr"></div>
        </NavPageContainer>
    </>
  );
}

export default MasterPage