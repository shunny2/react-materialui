import { BaseLayout } from '../../shared/layouts';
import { ListingToolbar } from '../../shared/components';

export const Dashboard = () => {

  return (
    <BaseLayout 
      title='Initial Page' 
      toolbar={(
        <ListingToolbar showInputSearch />
      )}
    >

    </BaseLayout>
  );
};