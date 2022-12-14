import { createTheme } from "@mui/material";

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1300,
            xl: 1540
        },
    },
    palette: {
        primary: {
            light:"rgb(59 130 246 / 0.5)",
            main: "rgb(59 130 246 )",
            dark: "rgb(23 106 243 )",
            contrastText:"#fff"
        },
        customBlue: { main: '#60a5fa' },
        customRed: { main: '#f87171;' }
    }
})

export default theme