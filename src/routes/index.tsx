import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import { 
  Dashboard,
  ListingCities, 
  ListingPeople, 
  DetailsCities, 
  DetailsPeople 
} from '../pages';

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
        icon: 'location_city',
        path: '/cities',
        label: 'Cities'
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

      <Route path="/cities" element={<ListingCities />} />
      <Route path="/cities/details/:id" element={<DetailsCities />} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};