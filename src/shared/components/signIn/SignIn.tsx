import { ReactNode, useState } from 'react';
import { Box } from '@mui/system';
import { Button, Card, CardActions, CardContent, CircularProgress, Typography } from '@mui/material';
import * as yup from 'yup';

import { useAuthContext } from '../../contexts';
import { IVFormErrors, useVForm, VForm, VTextField } from '../../forms';

interface IFormData {
  email: string;
  password: string;
}

const signInSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.
    string()
    .required()
    .min(8)
});

interface ISignInProps {
  children: ReactNode;
}

export const SignIn = ({ children }: ISignInProps) => {
  const { isAuthenticated, signIn } = useAuthContext();
  const { formRef } = useVForm();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (data: IFormData) => {
    setIsLoading(true);

    signInSchema
      .validate(data, { abortEarly: false })
      .then((validatedData) => {
        setIsLoading(true);
        signIn(validatedData)
          .then(() => {
            setIsLoading(false);
          });
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

  if (isAuthenticated) {
    return (
      <>
        {children}
      </>
    );
  }

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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '250' }}>
              <Typography variant='h6' align='center'>Login</Typography>

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
            </Box>
          </CardContent>
          <CardActions>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Button
                type='submit'
                variant='contained'
                disabled={isLoading}
                endIcon={isLoading ? <CircularProgress size={20} variant='indeterminate' /> : undefined}
              >
                Log in
              </Button>
            </Box>
          </CardActions>
        </Card>
      </VForm>
    </Box>
  );
};