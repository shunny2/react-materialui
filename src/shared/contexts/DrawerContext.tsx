import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface IDrawerOptionsDataProps {
  icon: string;
  path: string;
  label: string;
}

interface IDrawerContextDataProps {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  drawerOptions: IDrawerOptionsDataProps[];
  setDrawerOptions: (newDrawerOptions: IDrawerOptionsDataProps[]) => void;
}

const DrawerContext = createContext({} as IDrawerContextDataProps);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

interface IDrawerProviderProps {
  children: ReactNode;
}

export const DrawerProvider = ({ children }: IDrawerProviderProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOptionsDataProps[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOptionsDataProps[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        toggleDrawerOpen,
        drawerOptions,
        setDrawerOptions: handleSetDrawerOptions
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};