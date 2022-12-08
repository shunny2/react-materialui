import { useCallback, useState } from 'react';
import { Box } from '@mui/system';
import { Button, Card, CardActions, CardContent, CircularProgress, Typography, useMediaQuery, useTheme } from '@mui/material';
import * as yup from 'yup';

import { IVFormErrors, useVForm, VForm, VTextField } from '../../forms';
import { UserDetails, UserService } from '../../services/api/user/UserService';

const signInSchema: yup.SchemaOf<UserDetails> = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(4),
  email: yup
    .string()
    .email()
    .required(),
  password: yup.
    string()
    .required()
    .min(8),
  repeatPassword: yup
    .string()
    .required()
    .min(8)
});

export const Register = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { formRef } = useVForm();

  const [isLoading, setIsLoading] = useState(false);

  const register = useCallback(async (userData: UserDetails) => {
    const result = await UserService.create(userData);
    
    if (result instanceof Error)
      return alert(result.message);
  }, []);

  const handleSubmit = (data: UserDetails) => {
    setIsLoading(true);

    signInSchema
      .validate(data, { abortEarly: false })
      .then((validatedData) => {
        register(validatedData)
          .then(() => {
            setIsLoading(false);
          });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);

        const validationErrors: IVFormErrors = {};

        errors.inner.forEach((error) => {
          if (!error.path)
            return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <VForm ref={formRef} onSubmit={handleSubmit}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: smDown ? 300 : 600, height: 220 }}>
              <Typography variant='h6' align='center' fontWeight='bold'>Register</Typography>

              <VTextField
                fullWidth
                name='name'
                type='text'
                label='Name'
                disabled={isLoading}
              />

              <VTextField
                fullWidth
                name='email'
                type='email'
                label='Email'
                disabled={isLoading}
              />

              <VTextField
                fullWidth
                name='password'
                type='password'
                label='Password'
                disabled={isLoading}
              />

              <VTextField
                fullWidth
                name='repeatPassword'
                type='password'
                label='Confirm Password'
                disabled={isLoading}
              />

            </Box>
          </CardContent>
          <CardActions sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Button
                type='submit'
                variant='contained'
                disabled={isLoading}
                endIcon={isLoading ? <CircularProgress size={20} variant='indeterminate' /> : undefined}
              >
                Create an account
              </Button>
            </Box>
          </CardActions>
        </Card>
      </VForm>
    </Box>
  );
};