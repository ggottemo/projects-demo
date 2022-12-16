import React from "react";
import {ThemeProvider, createTheme} from "@mui/material";
import {CssBaseline} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
})

const DarkThemeProvider = ({children}) => {
    return (

    <ThemeProvider theme={darkTheme}>
        {children}
    </ThemeProvider>
        )
}

export default DarkThemeProvider
