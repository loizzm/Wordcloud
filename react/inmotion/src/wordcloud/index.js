import React from 'react';
import Form from '../form';
import image from '/home/lms/inmotion/react/inmotion/src/wordcloud/OIP.jpeg';
import './wordcloud.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useRef } from 'react';


const Wordcloud=()=>{

    const enviarWord = (form) =>{
        return axios.get('http://localhost:8000/wc/wordcloud/',
        {
            params : form,
        })
        .then(response => {
          console.log(response.data);
        })
    }
    const receberNuvem = () =>{
        return axios.get('http://localhost:8000/wc/cloud/')
        .then(response => {
          console.log(response.data['image']);
          setImageurl(response.data['image'])
        })
    }

    const [enviado, setEnviado] = useState(false)
    const [value, setValue] = useState('')
    const [imageurl, setImageurl] = useState('')
    const bottomEl = useRef(null);

    const aoSubmter = (evento) => {
        evento.preventDefault()
        console.log('Form foi submetido')
        setEnviado(true)
        enviarWord({valor : value})
    }

    const aoResetar = () => {
        console.log('Form foi resetado')
        setEnviado(false)
        receberNuvem()

    }

    const scrollToBottom = () => {
        bottomEl.current?.scrollIntoView({ behavior: 'smooth' , block: 'nearest', inline : 'start'});
      };
    
      useEffect(() => {

            setTimeout(() => {
            scrollToBottom()
      },450)    
    },[imageurl]);

    return (
            
            <div className='wordcloud'>
            <div className='body'>
                <img src={image} alt="logo"/>
            <div className='formulario'>
                <Form aoenviar={aoSubmter} aoresetar={aoResetar} aoalterar={value => setValue(value)} />
                
            </div>   
            </div>
            <div ref={bottomEl}>
                {imageurl ? 
            <img  src= {imageurl} alt = "wordcloud"/>
            : 
            <div>
            </div>  
            }
            </div>
            </div>
        )
}
 export default Wordcloud