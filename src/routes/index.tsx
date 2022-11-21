import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAppThemeContext } from "../shared/contexts";

export const AppRoutes = () => {
    const { toggleTheme } = useAppThemeContext();

    return (
        <Routes>
            <Route path="/initial-page" element={<Button variant="contained" color="primary" onClick={toggleTheme}>Button</Button>} />
            <Route path="*" element={<Navigate to="/initial-page" />} />
        </Routes>
    );
}