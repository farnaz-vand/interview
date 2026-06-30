import { useForm } from 'react-hook-form';

import { Typography } from '@mui/material';

import { Form } from 'src/components/hook-form';
import appHdrSchema from '../../../../public/data.json';

import FormNode from './form-node';

export default function DashboardView() {
  const methods = useForm();

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((formValues) => {
    console.log(formValues);
  });

  return (
    <>
      <Typography variant="h3" textAlign="center">
        Welcome to RUNC!
      </Typography>

      <Form methods={methods} onSubmit={onSubmit}>
        <FormNode node={appHdrSchema?.appHdr?.element} />
          <button type='submit'>submit</button>
      </Form>
    </>
  );
}
