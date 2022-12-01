import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { DetailsToolbar } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { PeoplesService } from '../../shared/services/api/peoples/PeoplesService';
import { VTextField } from '../../shared/forms';

interface IFormData {
  email: string;
  cityId: number;
  fullName: string;
}

export const DetailsPeople = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);

      PeoplesService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/people');
          } else {
            setName(result.fullName);
            formRef.current?.setData(result);
          }
        });
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    setIsLoading(true);

    if (id === 'new') {
      PeoplesService.create(data)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error)
            alert(result.message);
          else
            navigate(`/people/details/${result}`);
        });
    } else {
      PeoplesService.updateById(Number(id), { id: Number(id), ...data })
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error)
            alert(result.message);
        });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Do you want to delete this record?'))
      PeoplesService.deleteById(id)
        .then((result) => {
          if (result instanceof Error)
            alert(result.message);
          else
            navigate('/people');
        });
  };

  return (
    <BaseLayout
      title={id === 'new' ? 'New People' : name}
      toolbar={
        <DetailsToolbar
          showNewButton={id !== 'new'}
          showDeleteButton={id !== 'new'}
          showSaveAndReturnButton

          onClickNewButton={() => navigate('/people/details/new')}
          onClickSaveButton={() => formRef.current?.submitForm()}
          onClickBackButton={() => navigate('/people')}
          onClickDeleteButton={() => handleDelete(Number(id))}
          onClickSaveAndReturnButton={() => formRef.current?.submitForm()}
        />
      }
    >




      <Form ref={formRef} onSubmit={handleSave}>
        <Box component={Paper} variant='outlined' sx={{ margin: 1, display: 'flex', flexDirection: 'column' }}>
          <Grid container direction='column' padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>Geral</Typography>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4}>
                <VTextField
                  fullWidth
                  label='Name'
                  name='fullName'
                  disabled={isLoading}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4}>
                <VTextField
                  fullWidth
                  label='Email'
                  name='email'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4}>
                <VTextField
                  fullWidth
                  label='City'
                  name='cityId'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

          </Grid>
        </Box>
      </Form>
    </BaseLayout>
  );
};