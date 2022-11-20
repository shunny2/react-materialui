import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/initial-page" element={<Button variant="contained" color="primary">Button</Button>} />
            <Route path="*" element={<Navigate to="/initial-page" />} />
        </Routes>
    );
}