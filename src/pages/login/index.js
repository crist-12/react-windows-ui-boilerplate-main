import React, {Image} from 'react'
import login from "../../assets/login.jpg"
import { AvatarView, InputText, Button } from 'react-windows-ui'
import user from "../../assets/user.png"

const Login = () => {
    return (
        <div style={{backgroundImage:`url(${login})`, height: '100vh', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', flex:1, display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
            <AvatarView
                src={user}
                isLoading={false}
                size="medium"
                showDropShadow={false}
                />
            </div>
            <div style={{flex:2, display:'flex', alignItems: 'flex-start', justifyContent:'center', flex:2}}>
            <div style={{display:'block', textAlign: 'center'}}>
            <h2 style={{color: 'white'}}>Iniciar Sesión</h2>
            <InputText
                placeholder="Nombre de Usuario"
                tooltip="Ingrese nombre de usuario"
                />
                <br/>
                <br/>
                <br/>
            <InputText
                type="password"
                placeholder="Ingrese su contraseña"
                /> 
                <br/>
                <br/>
                <br/>
            <Button
                value="Iniciar Sesión"
                isLoading={false}
                onClick={() => {}}
                tooltip="Iniciar Sesión"
                />
            </div>
            
            </div>
        </div>
    )
}

export default Login;