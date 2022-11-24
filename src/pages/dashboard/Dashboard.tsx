import { BaseLayout } from '../../shared/layouts';
import { DetailsToolbar, ListingToolbar } from '../../shared/components';

export const Dashboard = () => {

  return (
    <BaseLayout 
      title='Initial Page' 
      toolbar={(
        // <ListingToolbar showInputSearch />
        <DetailsToolbar showSaveAndReturnButton />
      )}
    >

    </BaseLayout>
  );
};