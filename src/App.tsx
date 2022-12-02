import { BrowserRouter } from 'react-router-dom';

// import './shared/forms/YupTranslations';

import { AppThemeProvider, DrawerProvider, AuthProvider } from './shared/contexts/';
import { SideBar, SignIn } from './shared/components';
import { AppRoutes } from './routes';

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <SignIn>
          <DrawerProvider>
            <BrowserRouter>

              <SideBar>
                <AppRoutes />
              </SideBar>

            </BrowserRouter>
          </DrawerProvider>
        </SignIn>
      </AppThemeProvider>
    </AuthProvider>
  );
};