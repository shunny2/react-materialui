import { ReactNode } from 'react';
import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';

import { useDrawerContext } from '../../contexts';

interface ISideBarProps {
  children: ReactNode;
}

export const SideBar = ({ children }: ISideBarProps) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box sx={{ width: theme.spacing(28), height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ width: '100%', height: theme.spacing(20), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              alt="Alexander Davis"
              src="https://github.com/shunny2.png"
            />
          </Box>

          <Divider />

          <Box sx={{ flex: 1 }}>
            <List component='nav'>
              <ListItemButton>
                <ListItemIcon>
                  <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText primary='Initial Page' />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box sx={{ height: '100vh', marginLeft: smDown ? 0 : theme.spacing(28) }}>
        {children}
      </Box>
    </>
  );
};