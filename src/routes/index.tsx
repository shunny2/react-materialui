import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import { Dashboard } from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([{
      icon: 'home',
      path: '/initial-page',
      label: 'Initial Page'
    }]);
  }, []);

  return (
    <Routes>
      <Route path="/initial-page" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/initial-page" />} />
    </Routes>
  );
};