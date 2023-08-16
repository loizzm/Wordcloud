import React from 'react';
import './form.css'
import Button from '../button';

const Form=(props)=>{

    const aoDigitado = (evento) => {
        props.aoalterar(evento.target.value)
    }

    return(
    <div className='form'>  
    <form onSubmit={ (evento) => props.aoenviar(evento)} onReset={() => props.aoresetar()}>
        <label>
            Insira a palavra:
        </label>
        <input  onChange={aoDigitado} type="text" id="word" name="word" placeholder='exemplo: Força' required='true'/>
        <Button type="submit" texto="Enviar" bt="bt1"/>
        <Button type="reset" texto=" Ver Nuvem" className="bt2" id="bt"/>
    </form>
    </div> )
 }
export default Form