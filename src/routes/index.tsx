import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import { Dashboard, DetailsPeople, ListingPeople } from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/home',
        label: 'Home'
      },
      {
        icon: 'people',
        path: '/people',
        label: 'People'
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />
      <Route path="/people" element={<ListingPeople />} />
      <Route path="/people/details/:id" element={<DetailsPeople />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};