import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { BaseLayout } from '../../shared/layouts';
import { ListingToolbar } from '../../shared/components';
import { PeoplesService } from '../../shared/services/api/peoples/PeoplesService';
import { useDebounce } from '../../shared/hooks';

export const ListingPeople = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  useEffect(() => {
    debounce(() => {
      PeoplesService.getAll(1, search)
        .then((result) => {
          if (result instanceof Error)
            return alert(result.message);
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

    </BaseLayout>
  );
};