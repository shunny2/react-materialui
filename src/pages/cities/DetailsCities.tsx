import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as yup from 'yup';

import { DetailsToolbar } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { CitiesService } from '../../shared/services/api/cities/CitiesService';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';

interface IFormData {
  name: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(3),
});

export const DetailsCities = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);

      CitiesService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/cities');
          } else {
            setName(result.name);
            formRef.current?.setData(result);
          }
        });
    } else {
      formRef.current?.setData({
        name: ''
      });
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    formValidationSchema
      .validate(data, { abortEarly: false })
      .then((validatedData) => {
        setIsLoading(true);

        if (id === 'new') {
          CitiesService.create(validatedData)
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error)
                alert(result.message);
              else {
                if (isSaveAndClose())
                  navigate('/cities');
                else
                  navigate(`/cities/details/${result}`);
              }
            });
        } else {
          CitiesService.updateById(Number(id), { id: Number(id), ...validatedData })
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error)
                alert(result.message);
              else {
                if (isSaveAndClose())
                  navigate('/cities');
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
      CitiesService.deleteById(id)
        .then((result) => {
          if (result instanceof Error)
            alert(result.message);
          else
            navigate('/cities');
        });
  };

  return (
    <BaseLayout
      title={id === 'new' ? 'New City' : name}
      toolbar={
        <DetailsToolbar
          showNewButton={id !== 'new'}
          showDeleteButton={id !== 'new'}
          showSaveAndReturnButton

          onClickSaveButton={save}
          onClickSaveAndReturnButton={saveAndClose}
          onClickBackButton={() => navigate('/cities')}
          onClickDeleteButton={() => handleDelete(Number(id))}
          onClickNewButton={() => navigate('/cities/details/new')}
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
                  name='name'
                  disabled={isLoading}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </BaseLayout>
  );
};