import React, { useState, useEffect } from 'react';
import axios from 'axios'

const URL_API = '' // process.env.REACT_APP_URL_SERVER

const Sign = () => {

    const [sign, setSign] = useState(null)

    const buscarFirma = async () => {
        const res = await axios.get(URL_API + '/adm/prospects_sign/1')
        const data = await res.data
        setSign('http://localhost:4000/' + data[0].sign.data)
        // setSign('http://localhost:4000/' + img1)
    }

    useEffect(() => {
        // buscarFirma()
        fetch(`{URL} + /adm/prospects_sign/1`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json, charset=UTF-8',
                'Accept': 'application/json, text/html',
            },
            credentials: 'include',
        })
        .then(data => data.json())
        .then(data => {
            console.log(data)
        })
    },[])

    return (
        <div className="">
            {sign &&
                <div><h2>{"Titulo"}</h2><br /><p>{"Cuerpo"}</p>
                <img src="{sign}" alt="Firma"></img>
                </div>
            }    
        </div>
    )

}

export default Sign