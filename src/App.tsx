import { BrowserRouter } from 'react-router-dom';

// import './shared/forms/YupTranslations';

import { AppThemeProvider, DrawerProvider } from './shared/contexts/';
import { SideBar } from './shared/components';
import { AppRoutes } from './routes';

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>

          <SideBar>
            <AppRoutes />
          </SideBar>

        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};