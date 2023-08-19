import React from 'react';
import Form from '../form';
import image from '/home/lms/inmotion/react/inmotion/src/wordcloud/OIP.jpeg';
import './wordcloud.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useRef } from 'react';
import Config from '../Config';


const Wordcloud=()=>{
    const config = new Config();
    const Configs = config.returnConfig()
    const enviarWord = (form) =>{
        const url = Configs['API_URL'] + 'wc/wordcloud/'
        return axios.get(url,
        {
            params : form,
        })
        .then(response => {
          console.log(response.data);
        })
    }
    const receberNuvem = () =>{
        const url = Configs['API_URL'] + 'wc/cloud/'
        return axios.get(url)
        .then(response => {
          console.log(response.data['image']);
          setImageurl(response.data['image'])
        })
    }

    const [value, setValue] = useState('')
    const [imageurl, setImageurl] = useState('')
    const bottomEl = useRef(null);

    const aoSubmter = (evento) => {
        evento.preventDefault()
        console.log('Form foi submetido')
        enviarWord({valor : value})
    }

    const aoResetar = () => {
        console.log('Form foi resetado')
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