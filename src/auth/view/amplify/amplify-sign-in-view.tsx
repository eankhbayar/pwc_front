import { z as zod } from 'zod';
import { useRef, useState } from 'react';
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

import { useAuthContext } from '../../hooks';
import { FormHead } from '../../components/form-head';
import { signInWithFace, signInWithPassword } from '../../context/amplify';
import WebCamera from './webcam-view';
import { Card, CardContent, Typography, Button } from '@mui/material';

const aspectRatios = {
  landscape: {
    width: 1280,
    height: 720,
  },

  portrait: {
    height: 720,
    width: 1280,
  },
}

// ----------------------------------------------------------------------

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
});

// ----------------------------------------------------------------------

export function AmplifySignInView() {
  const router = useRouter();

  const password = useBoolean();

  const [errorMsg, setErrorMsg] = useState('');

  const { checkUserSession } = useAuthContext();

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const params = {
        bucket_name: 'pwc-sign-in-bucket',
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

      const user = await signInWithFace({ username: data.email });

      await checkUserSession?.();

      router.refresh();
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
      <Field.Text name="email" label="Email address" InputLabelProps={{ shrink: true }} />
      {capturedImage ? (
        <Button variant="contained" color="primary" onClick={retakePicture}>
          Retake
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={capture}>
          Capture
        </Button>
      )}
      {capturedImage == null && (
        <ReactWebCam
          mirrored
          audio={false}
          height={400}
          width={400}
          screenshotFormat='image/jpeg'
          ref={webcamRef}
        />
      )}
      {capturedImage && (
        <Box mt={2}>
          <img src={capturedImage} alt="Captured" style={{ width: '100%' }} />
        </Box>
      )}

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Sign in..."
      >
        Sign in
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        title="Sign in to your account"
        description={
          <>
            {`Don’t have an account? `}
            <Link component={RouterLink} href={paths.auth.amplify.signUp} variant="subtitle2">
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
    </>
  );
}
