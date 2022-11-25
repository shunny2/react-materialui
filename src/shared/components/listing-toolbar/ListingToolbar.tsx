import { Box } from '@mui/system';
import { Button, Icon, Paper, TextField, useTheme } from '@mui/material';

import { Environment } from '../../environment';

interface IListingToolbarProps {
  textSearch?: string;
  showInputSearch?: boolean;
  onChangeTextSearch?: (newText: string) => void;

  textNewButton?: string;
  showNewButton?: boolean;
  onClickNewButton?: () => void;
}

export const ListingToolbar = ({
  textSearch = '',
  showInputSearch = false,
  onChangeTextSearch,
  
  textNewButton = 'New',
  showNewButton = true,
  onClickNewButton
}: IListingToolbarProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        gap: 1,
        marginX: 1,
        padding: 1,
        paddingX: 2,
        display: 'flex',
        alignItems: 'center',
        height: theme.spacing(5)
      }}
      component={Paper}
    >
      {showInputSearch && (
        <TextField
          size='small'
          value={textSearch}
          placeholder={Environment.INPUT_SEARCH}
          onChange={(e) => onChangeTextSearch?.(e.target.value)}
        />
      )}

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'end' }}>
        {showNewButton && (
          <Button
            color='primary'
            disableElevation
            variant='contained'
            onClick={onClickNewButton}
            endIcon={<Icon>add</Icon>}
          >
            {textNewButton}
          </Button>
        )}
      </Box>
    </Box>
  );
};