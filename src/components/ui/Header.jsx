import { AppBar, Container, Toolbar, Box, Typography } from '@mui/material'
import styled from 'styled-components'

import { FinanservsHorizontalLogoWhiteImg } from '../images'
import { Nav, NavMobile } from './'


const Header = (props) => {

    return (
        <AppBar position='static' elevation={0}>
            <Container maxWidth="xll">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 10, display: { xs: 'none', md: 'flex' } }}
                    >
                        <FinanservsHorizontalLogoWhiteImg />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <NavMobile />
                    </Box>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <FinanservsHorizontalLogoWhiteImg />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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