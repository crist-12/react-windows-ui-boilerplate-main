import React, {Image, useState, useEffect} from 'react'
import login from "../../assets/login.jpg"
import { AvatarView, InputText, Button, SplashScreen } from 'react-windows-ui'
import user from "../../assets/user.png"
import { useHistory } from 'react-router-dom'
import { useAuthState, loginUser } from '../../stores/AuthStore'
import { Alert } from 'react-windows-ui'

const Login = () => {

    const [splash, setSplash] = useState(true);
    const history = useHistory();
    const authState = useAuthState();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("Algo salió mal, inténtalo de nuevo")

    const [validate, setValidate] = useState(false);

    useEffect(() => {
     setSplash(false);
    }, [])

    useEffect(()=> {

    }, [])

    const handleLogin = async() => {
        if(username == ""){
           setValidate(true)
           setMessage("El nombre de usuario no puede estar vacío")
           return
        }
        if(password == ""){
            setValidate(true)
            setMessage("La contraseña no puede estar vacía")
            return
        }

       await loginUser(username, password);
       if(authState.get().isLoggedIn){
            //await postLoginLog(" ingresó al sistema");
            history.push("/home")
            setValidate(false)
            return
       }else{
            setValidate(true)
            setMessage(authState.me.get().message)
            return
       }
        
    }


    
    return (
        <>
        
        <SplashScreen
            //duration={1000} // adjust how long it takes after render 
            isVisible={splash}
            title={"Kassa"}
            />
        <div id="login-screen" style={{backgroundImage:`url(${login})`, height: '100vh', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', flex:1, display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
            {

            
            <Alert
                isVisible={validate}
                title="Atención"
                message={message}
                onBackdropPress={()=>{setValidate(false)}}>
                <button onClick={()=>{setValidate(false)}}>OK</button>
            </Alert>
        }
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
            <input
                className='app-input-text'
                placeholder="Nombre de Usuario"
                tooltip="Ingrese nombre de usuario"
                value={username}
                id="input-username"
                onChange={(e) => setUsername(e.target.value)}
                />
                <br/>
                <br/>
                <br/>
            <input
                type="password"
                className='app-input-text'
                placeholder="Ingrese su contraseña"
                value={password}
                id="input-password"
                onChange={(e) => setPassword(e.target.value)}
                /> 
                <br/>
                <br/>
                <br/>
            <button
                className='app-button animate'
                onClick={handleLogin}
                id="button-login"
                tooltip="Iniciar Sesión"
                >Iniciar Sesión</button>
            </div>
            
            </div>
        </div>
        </>
    )
}

export default Login;