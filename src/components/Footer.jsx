import { Link, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { userData } from '../redux/slices/user'


const SimpleFooterContainer = styled.footer`
    background-color: ${({ theme}) => theme.colors.white };
    padding: ${ ({ theme }) => theme.dims.padding.largePadding };
    text-align: center;
`

const LoggedOutFooter = () => 
    <SimpleFooterContainer>
        <Routes>
            <Route path='/password' element={<p>¿Olvidó su contaseña? <Link to='/usuario/password'>Nueva contaseña</Link></p>} />
        </Routes> 
    </SimpleFooterContainer>

export const Footer = () => {
    const user = useSelector(userData)

    return (
        user ? null : <LoggedOutFooter />
    )
}