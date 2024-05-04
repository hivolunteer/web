import { createTheme } from "@mui/material";

export const myTheme = createTheme({
    typography: {
        fontFamily: [
            'Montserrat',
            'sans-serif',
        ].join(','),
    },
    palette: {
        primary: {
            main: '#67A191',
        },
        secondary: {
            main: '#999899',
        },
    },
});