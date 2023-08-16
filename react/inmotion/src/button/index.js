import React from 'react';
import './button.css'

const Button=(props)=>{


    return(
        <div className='button'>
            <button className="twitter" type={props.type} name="bt">
                {props.texto}
            </button>
        </div>
    );
}
export default Button