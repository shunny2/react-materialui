import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';

import { BaseLayout } from '../../shared/layouts';
import { ListingToolbar } from '../../shared/components';
import { IPeoplesListing, PeoplesService } from '../../shared/services/api/peoples/PeoplesService';
import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../shared/environment';

export const ListingPeople = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const [rows, setRows] = useState<IPeoplesListing[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PeoplesService.getAll(1, search)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error)
            return alert(result.message);

          setTotalCount(result.totalCount);
          setRows(result.data);
        });
    });
  }, [search]);

  return (
    <BaseLayout
      title='List of People'
      toolbar={
        <ListingToolbar
          showInputSearch
          textSearch={search}
          onChangeTextSearch={text => setSearchParams({ search: text }, { replace: true })}
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
                  <TableCell>Buttons</TableCell>
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
          </TableFooter>
        </Table>
      </TableContainer>
    </BaseLayout>
  );
};