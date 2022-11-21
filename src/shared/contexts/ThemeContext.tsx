import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";

import { DarkTheme, LightTheme } from "./../themes";

interface IThemeContextDataProps {
    themeName: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextDataProps);

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
}

interface IThemeProviderProps {
    children: ReactNode;
}

export const AppThemeProvider = ({ children }: IThemeProviderProps) => {
    const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
    }, []);

    const theme = useMemo(() => {
        if (themeName === 'light')
            return LightTheme;

        return DarkTheme;
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Box sx={{ width: "100vw", height: "100vh", backgroundColor: theme.palette.background.default }} >
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}