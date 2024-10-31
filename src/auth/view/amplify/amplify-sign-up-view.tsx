import { z as zod } from 'zod';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import ReactWebCam from 'react-webcam';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { signUp } from '../../context/amplify';
import { FormHead } from '../../components/form-head';
import { SignUpTerms } from '../../components/sign-up-terms';
import { Card, CardContent, Typography, Button } from '@mui/material';

// ----------------------------------------------------------------------

export type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

const aspectRatios ={
  landscape:{
      width: 1280,
      height: 720,
  },

  portrait:{
      height: 720,
      width: 1280,
  },
}

export const SignUpSchema = zod.object({
  firstName: zod.string().min(1, { message: 'First name is required!' }),
  lastName: zod.string().min(1, { message: 'Last name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

// ----------------------------------------------------------------------

export function AmplifySignUpView() {
  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();

  const password = useBoolean();

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp({
        username: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      const params = {
        bucket_name: 'pwc-sign-up-bucket',
        file_name: data.email + '.jpeg',
        object_name: data.email,
        file: capturedImage,
        metadata: {
            email: data.email
        }
      };

      await fetch('https://qhgg5j4v2f.execute-api.us-east-1.amazonaws.com/prod/upload', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const searchParams = new URLSearchParams({ email: data.email }).toString();

      const href = `${paths.auth.amplify.signIn}?${searchParams}`;

      router.push(href);
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState<any>(null);

  const capture = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
  };

  const retakePicture = () => {
      setCapturedImage(null);
  };

  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>
        <Field.Text name="firstName" label="First name" InputLabelProps={{ shrink: true }} />
        <Field.Text name="lastName" label="Last name" InputLabelProps={{ shrink: true }} />
      </Box>

      <Field.Text name="email" label="Email address" InputLabelProps={{ shrink: true }} />

      <Field.Text
        name="password"
        label="Password"
        placeholder="6+ characters"
        type={password.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Create account..."
      >
        Create account
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        title="Get started absolutely free"
        description={
          <>
            {`Already have an account? `}
            <Link component={RouterLink} href={paths.auth.amplify.signIn} variant="subtitle2">
              Get started
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>

      <Box mt={2}>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Web Camera</Typography>
                    {capturedImage == null && (
                        <ReactWebCam
                        mirrored
                        audio={false}
                        height={aspectRatios.landscape.height}
                        width={aspectRatios.landscape.width}
                        screenshotFormat='image/jpeg'
                        ref={webcamRef}
                    />
                    )}
                    <Box mt={2}>
                        {capturedImage ? (
                            <Button variant="contained" color="primary" onClick={retakePicture}>
                                Retake
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" onClick={capture}>
                                Capture
                            </Button>
                        )}
                    </Box>
                    {capturedImage && (
                        <Box mt={2}>
                            <img src={capturedImage} alt="Captured" style={{ width: '100%' }} />
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>

      <SignUpTerms />
    </>
  );
}
