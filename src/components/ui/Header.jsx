import { AppBar, Toolbar } from '@mui/material'
import styled from 'styled-components'

import { FinanservsHorizontalLogoWhiteImg } from '../images'
import { Nav } from './Nav'

const Div = styled.div`
    background-color: rgb(13, 110, 253);
    padding-left: 15px;
`

const LayoutHeader = styled.header`
    display: grid;
    min-width: 100vh;
    max-height: 50px;
    grid-template-columns: auto minmax(1, 1fr) auto;
    grid-template-areas: 'logo menu menu';
    & .logo { grid-area: logo; }
    & .menu { grid-area: menu; }
`

const Header = (props) => {
    return (
        <AppBar position='' elevation={ 0 }>
            <Toolbar>
                <LayoutHeader>
                    <Div className="logo">
                        <FinanservsHorizontalLogoWhiteImg />
                    </Div>
                    <div style={{ flex: 1 }} />
                    <div className="menu">
                        <Nav />
                    </div>
                </LayoutHeader>
            </Toolbar>
        </AppBar>
    )
}

export default styled(Header)`
    text-align: center;
    padding: 1em 0;
    img {
        vertical-align: middle;
    }
`