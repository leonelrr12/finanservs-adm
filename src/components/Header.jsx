import styled from 'styled-components'
import { FinanservsHorizontalLogoWhiteImg } from './images'
import { Nav } from './Nav'

const Div = styled.div`
    background-color: ${ ({ theme }) => theme };
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
        <LayoutHeader>
            <Div className="logo">
                <FinanservsHorizontalLogoWhiteImg />
            </Div>
            <div className="menu">
                <Nav />
            </div>
        </LayoutHeader>
    )
}

export default styled(Header)`
    text-align: center;
    padding: 1em 0;
    img {
        vertical-align: middle;
    }
`