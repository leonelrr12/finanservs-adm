import { Routes, Route } from 'react-router-dom'
import { LayoutContainer } from '../../theme';
import { Footer } from '../ui/Footer';
import Header from '../ui/Header';


export const Layout = ({ children }) => {
    return <LayoutContainer>
        <nav>
            <Routes>
                <Route path="/login" element={ <nav></nav> } />
                <Route path="/password" element={ <nav></nav> } />
                <Route path="/" element={ <nav></nav> } />
                <Route path="*" element={ <Header></Header> } />
            </Routes>
        </nav>
        <main>
            { children }
        </main>
        <Footer></Footer>
    </LayoutContainer>
}