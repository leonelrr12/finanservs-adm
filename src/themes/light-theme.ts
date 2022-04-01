import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";


export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: grey[300]
        },
        primary: {
            main: '#4a148c'
        },
        secondary: {
            main: '#19857b'
        },
        error: {
            main: red.A400
        },
        warning: {
            main: '#ff9800'
        },
        info: {
            main: '#03a9f4'
        },
        success: {
            main: '#4caf50'
        },
    },

    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {}
        }
    }
})
