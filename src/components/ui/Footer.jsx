import { useContext } from "react";
import { LoginContext } from "../../context/loginContext";
import { Link, Routes, Route } from 'react-router-dom'

import styled from 'styled-components'

const SimpleFooterContainer = styled.footer`
    background-color: 'red';
    padding: '0.8em 1.2em';
    text-align: center;
`

const LoggedOutFooter = () => 
    <SimpleFooterContainer>
        <Routes>
            <Route path='/password' element={<p>¿Olvidó su contaseña? <Link to='/usuario/password'>Nueva contaseña</Link></p>} />
        </Routes> 
    </SimpleFooterContainer>

export const Footer = () => {
    const { userInfo: user } = useContext(LoginContext);

    return (
        user ? null : <LoggedOutFooter />
    )
}