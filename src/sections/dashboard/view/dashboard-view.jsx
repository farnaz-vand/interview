// ----------------------------------------------------------------------

import { useForm } from 'react-hook-form';

import { Typography } from '@mui/material';

import { Form } from 'src/components/hook-form';
import data from '../../../../public/data.json'; 

import FormNode from './form_node';

export default function DashboardView() {
  console.log('Full JSON Content:', data);
  const methods = useForm();

  const { handleSubmit } = methods;

  const onSubmit = methods.handleSubmit((formValues) => {
  const cleaned = JSON.parse(
    JSON.stringify(formValues, (key, value) => (value === undefined ? undefined : value))
  );

  console.log('Final Clean JSON:', cleaned);
});


  return (
    <>
      <Typography variant="h3" textAlign="center">
        Welcome to RUNC!
      </Typography>
      <Form methods={methods} onSubmit={onSubmit}>
    <FormNode node={data.appHdr.element} />

    <button type='submit'>submit</button>
      </Form>
    </>
  );
}
