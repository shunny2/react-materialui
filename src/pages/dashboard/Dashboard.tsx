import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';

import { BaseLayout } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';
import { CitiesService } from '../../shared/services/api/cities/CitiesService';
import { PeopleService } from '../../shared/services/api/people/PeopleService';

export const Dashboard = () => {
  const { debounce } = useDebounce();

  const [citiesIsLoading, setCitiesIsLoading] = useState(true);
  const [peopleIsLoading, setPeopleIsLoading] = useState(true);
  const [citiesTotalCount, setCitiesTotalCount] = useState(0);
  const [peopleTotalCount, setPeopleTotalCount] = useState(0);

  useEffect(() => {
    setCitiesIsLoading(true);
    setPeopleIsLoading(true);

    debounce(() => {
      CitiesService.getAll(1)
        .then((result) => {
          setCitiesIsLoading(false);

          if (result instanceof Error)
            return alert(result.message);

          setCitiesTotalCount(result.totalCount);
        });

      PeopleService.getAll(1)
        .then((result) => {
          setPeopleIsLoading(false);

          if (result instanceof Error)
            return alert(result.message);

          setPeopleTotalCount(result.totalCount);
        });
    });
  }, []);

  return (
    <BaseLayout title='Dashboard'>
      <Box sx={{ width: '100%', display: 'flex' }}>
        <Grid container margin={1}>
          <Grid container item spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total cities
                  </Typography>

                  <Box sx={{ padding: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {!citiesIsLoading && (
                      <Typography variant='h1'>
                        {citiesTotalCount}
                      </Typography>
                    )}

                    {citiesIsLoading && (
                      <CircularProgress />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total people
                  </Typography>

                  <Box sx={{ padding: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {!peopleIsLoading && (
                      <Typography variant='h1'>
                        {peopleTotalCount}
                      </Typography>
                    )}

                    {peopleIsLoading && (
                      <CircularProgress />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </BaseLayout>
  );
};