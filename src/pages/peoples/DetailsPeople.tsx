import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as yup from 'yup';

import { DetailsToolbar } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { PeoplesService } from '../../shared/services/api/peoples/PeoplesService';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';

interface IFormData {
  fullName: string;
  email: string;
  cityId: number;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  fullName: yup
    .string()
    .required()
    .min(3),
  email: yup
    .string()
    .required()
    .email(),
  cityId: yup
    .number()
    .required()
});

export const DetailsPeople = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

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
    } else {
      formRef.current?.setData({
        fullName: '',
        email: '',
        cityId: ''
      });
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    formValidationSchema
      .validate(data, { abortEarly: false })
      .then((validatedData) => {
        setIsLoading(true);

        if (id === 'new') {
          PeoplesService.create(validatedData)
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error)
                alert(result.message);
              else {
                if (isSaveAndClose())
                  navigate('/people');
                else
                  navigate(`/people/details/${result}`);
              }
            });
        } else {
          PeoplesService.updateById(Number(id), { id: Number(id), ...validatedData })
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error)
                alert(result.message);
              else {
                if (isSaveAndClose())
                  navigate('/people');
              }
            });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach((error) => {
          if (!error.path)
            return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
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

          onClickSaveButton={save}
          onClickSaveAndReturnButton={saveAndClose}
          onClickBackButton={() => navigate('/people')}
          onClickDeleteButton={() => handleDelete(Number(id))}
          onClickNewButton={() => navigate('/people/details/new')}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
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
      </VForm>
    </BaseLayout>
  );
};