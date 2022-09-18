import styled from 'styled-components'
import { Nav } from './'

const Header = () => {
    return (
        <Nav />
    )
}

export default styled(Header)`
    text-align: center;
    padding: 1em 0;
    img {
        vertical-align: middle;
    }
`