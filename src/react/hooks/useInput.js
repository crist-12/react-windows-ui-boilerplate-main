import React, { useState } from 'react'
import { InputText } from 'react-windows-ui';

/**
 * Hook de uso de input personalizado
 * @param {Object} options - Objeto que contiene las especificaciones para el input
 * @param {string} options.type - Tipo de input
 * @param {string} [options.tooltip] - Mensaje tooltip al desplegar el cursor sobre el input
 * @param {string} [options.placeholder] - Texto en placeholder para el input 
 * @param {string} [options.label] - Ícono a desplegarse 
 * @param {string} [options.width] - Ancho de la etiqueta en la que se mostrará el ícono
 * @param {boolean} [options.disabled] - Establece si está o no habilitado
 */
export const useInput = ({type, placeholder, tooltip, label, width, disabled}) => {
    const [value, setValue] = useState('');
    const reset = ()=> {
        setValue("")
    }

    const onChangeHandler = (event) => {
        setValue(e.target.value);
    }

    const input = <InputText type={type} value={value} placeholder={placeholder} tooltip={tooltip} width={width} label={label} disabled={disabled} onChange={onChangeHandler}/>

    return [value, input, reset]

}


