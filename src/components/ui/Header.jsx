import { AppBar, Container, Toolbar, Box } from '@mui/material'
import styled from 'styled-components'

import { FinanservsHorizontalLogoWhiteImg } from '../images'
import { Nav, NavMobile } from './'


const Header = () => {
    return (
        // <Nav />
        <AppBar position='fixed' elevation={0}>
            <Container maxWidth="xll">
                <Toolbar>
                    <Box
                        sx={{ mr: 10, display: { xs: 'none', md: 'flex' }}}
                    >
                        <FinanservsHorizontalLogoWhiteImg />
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' }}}>
                        <NavMobile />
                    </Box>

                    <Box
                        sx={{ display: { xs: 'flex', md: 'none' }}}
                    >
                        <FinanservsHorizontalLogoWhiteImg />
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
                        <Nav />
                    </Box>
                    
                </Toolbar>
            </Container>
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