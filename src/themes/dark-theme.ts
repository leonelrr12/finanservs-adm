import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";


export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        secondary: {
            main: '#19857b'
        },
        error: {
            main: red.A400
        },
        warning: {
            main: '#e65100'
        },
        info: {
            main: '#01579b'
        },
        success: {
            main: '#1b5e20'
        },
    },

    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    backgroundColor: '#0a58ca',
                }
            }
        }
    },
})
