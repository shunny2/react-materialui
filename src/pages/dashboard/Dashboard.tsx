import { BaseLayout } from '../../shared/layouts';
import { DetailsToolbar, ListingToolbar } from '../../shared/components';

export const Dashboard = () => {

  return (
    <BaseLayout 
      title='Home' 
      toolbar={(
        // <ListingToolbar showInputSearch />
        <DetailsToolbar showSaveAndReturnButton />
      )}
    >

    </BaseLayout>
  );
};