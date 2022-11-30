import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { DetailsToolbar } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { PeoplesService } from '../../shared/services/api/peoples/PeoplesService';
import { VTextField } from '../../shared/forms';

interface IFormData {
  email: string;
  cityId: string;
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
          }
        });
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    console.log(data);
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
      {isLoading && (
        <LinearProgress variant='indeterminate' />
      )}
      
      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField 
          name='fullName'
        />

        <VTextField 
          name='email'
        />

        <VTextField 
          name='cityId'
        />
      </Form>
    </BaseLayout>
  );
};