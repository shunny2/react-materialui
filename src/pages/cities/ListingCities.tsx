import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { BaseLayout } from '../../shared/layouts';
import { ListingToolbar } from '../../shared/components';

export const ListingCities = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  return (
    <BaseLayout
      title='List of Cities'
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