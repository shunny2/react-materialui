import { Box } from '@mui/system';
import { Button, Divider, Icon, Paper, useTheme } from '@mui/material';

interface IDetailsToolbarProps {
  textNewButton?: string;

  showNewButton?: boolean;
  showBackButton?: boolean;
  showDeleteButton?: boolean;
  showSaveButton?: boolean;
  showSaveAndReturnButton?: boolean;

  onClickNewButton?: () => void;
  onClickBackButton?: () => void;
  onClickDeleteButton?: () => void;
  onClickSaveButton?: () => void;
  onClickSaveAndReturnButton?: () => void;
}

export const DetailsToolbar = ({
  textNewButton = 'New',

  showNewButton = true,
  showBackButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  showSaveAndReturnButton = false,

  onClickNewButton,
  onClickBackButton,
  onClickDeleteButton,
  onClickSaveButton,
  onClickSaveAndReturnButton
}: IDetailsToolbarProps) => {
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
      {showSaveButton && (
        <Button
          color='primary'
          disableElevation
          variant='contained'
          onClick={onClickSaveButton}
          startIcon={<Icon>save</Icon>}
        >
          Save
        </Button>
      )}

      {showSaveAndReturnButton && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickSaveAndReturnButton}
          startIcon={<Icon>save</Icon>}
        >
          Save and return
        </Button>
      )}

      {showDeleteButton && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickDeleteButton}
          startIcon={<Icon>delete</Icon>}
        >
          Delete
        </Button>
      )}

      {showNewButton && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickNewButton}
          startIcon={<Icon>add</Icon>}
        >
          {textNewButton}
        </Button>
      )}

      <Divider variant='middle' orientation='vertical' />

      {showBackButton && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickBackButton}
          startIcon={<Icon>arrow_back</Icon>}
        >
          Back
        </Button>
      )}
    </Box>
  );
};