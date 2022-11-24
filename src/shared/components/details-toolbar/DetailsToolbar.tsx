import { Box } from '@mui/system';
import { Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';

interface IDetailsToolbarProps {
  textNewButton?: string;

  showNewButton?: boolean;
  showBackButton?: boolean;
  showDeleteButton?: boolean;
  showSaveButton?: boolean;
  showSaveAndReturnButton?: boolean;

  showNewButtonLoading?: boolean;
  showBackButtonLoading?: boolean;
  showDeleteButtonLoading?: boolean;
  showSaveButtonLoading?: boolean;
  showSaveAndReturnButtonLoading?: boolean;

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

  showNewButtonLoading = false,
  showBackButtonLoading = false,
  showDeleteButtonLoading = false,
  showSaveButtonLoading = false,
  showSaveAndReturnButtonLoading = false,

  onClickNewButton,
  onClickBackButton,
  onClickDeleteButton,
  onClickSaveButton,
  onClickSaveAndReturnButton
}: IDetailsToolbarProps) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

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
      {(showSaveButton && !showSaveButtonLoading) && (
        <Button
          color='primary'
          disableElevation
          variant='contained'
          onClick={onClickSaveButton}
          startIcon={<Icon>save</Icon>}
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Save
          </Typography>
        </Button>
      )}

      {showSaveButtonLoading && (<Skeleton width={110} height={60} />)}

      {(showSaveAndReturnButton && !showSaveAndReturnButtonLoading && !smDown && !mdDown) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickSaveAndReturnButton}
          startIcon={<Icon>save</Icon>}
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Save and return
          </Typography>
        </Button>
      )}

      {(showSaveAndReturnButtonLoading && !smDown) && (<Skeleton width={180} height={60} />)}

      {(showDeleteButton && !showDeleteButtonLoading) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickDeleteButton}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Delete
          </Typography>
        </Button>
      )}

      {showDeleteButtonLoading && (<Skeleton width={110} height={60} />)}

      {(showNewButton && !showNewButtonLoading && !smDown) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickNewButton}
          startIcon={<Icon>add</Icon>}
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            {textNewButton}
          </Typography>
        </Button>
      )}

      {(showNewButtonLoading && !smDown) && (<Skeleton width={110} height={60} />)}

      {(showBackButton && !showBackButtonLoading) && (
        <>
          <Divider variant='middle' orientation='vertical' />
          
          <Button
            color='primary'
            disableElevation
            variant='outlined'
            onClick={onClickBackButton}
            startIcon={<Icon>arrow_back</Icon>}
          >
            <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
              Back
            </Typography>
          </Button>
        </>
      )}

      {showBackButtonLoading && (<Skeleton width={110} height={60} />)}
    </Box>
  );
};