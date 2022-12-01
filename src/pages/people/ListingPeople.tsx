import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';

import { BaseLayout } from '../../shared/layouts';
import { ListingToolbar } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../shared/environment';
import { IPeopleListing, PeopleService } from '../../shared/services/api/people/PeopleService';

export const ListingPeople = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IPeopleListing[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get('page') || '1');
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PeopleService.getAll(page, search)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error)
            return alert(result.message);

          setTotalCount(result.totalCount);
          setRows(result.data);
        });
    });
  }, [page, search]);

  const handleDelete = (id: number) => {
    if (confirm('Do you want to delete this record?'))
      PeopleService.deleteById(id)
        .then((result) => {
          if (result instanceof Error)
            alert(result.message);
          else
            setRows(oldRows => [
              ...oldRows.filter(oldRow => oldRow.id !== id)
            ]);
        });
  };

  return (
    <BaseLayout
      title='List of People'
      toolbar={
        <ListingToolbar
          showInputSearch
          textSearch={search}
          onClickNewButton={() => navigate('/people/details/new')}
          onChangeTextSearch={text => setSearchParams({ search: text, page: '1' }, { replace: true })}
        />
      }
    >
      <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading && rows.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell sx={{ p: 1.2 }}>
                    <IconButton title='delete' size='small' onClick={() => handleDelete(row.id)}>
                      <Icon color='error'>delete</Icon>
                    </IconButton>
                    <IconButton title='edit' size='small' onClick={() => navigate(`/people/details/${row.id}`)}>
                      <Icon color='primary'>edit</Icon>
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.fullName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.EMPTY_LISTING}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}
            {(totalCount > 0 && totalCount > Environment.LINE_LIMIT) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    page={page}
                    count={Math.ceil(totalCount / Environment.LINE_LIMIT)}
                    onChange={(_, newPage) => setSearchParams({ search, page: newPage.toString() }, { replace: true })}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </BaseLayout>
  );
};