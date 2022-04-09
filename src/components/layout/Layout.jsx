import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components';
import { LayoutContainer } from '../../theme';
import { Footer } from '../ui/Footer';
import Header from '../ui/Header';

const LayoutNav = styled.nav`
  max-height: 50px;
`

export const Layout = ({ children }) => {
    return <LayoutContainer>
        <LayoutNav>
            <Routes>
                <Route path="/login" element={ <nav></nav> } />
                <Route path="/password" element={ <nav></nav> } />
                <Route path="/" element={ <nav></nav> } />
                <Route path="*" element={ <Header></Header> } />
            </Routes>
        </LayoutNav>
        <main>
            { children }
        </main>
        <Footer></Footer>
    </LayoutContainer>
}