import React, {useState} from 'react';
import ReactWebCam from 'react-webcam';
import { Typography, Card, CardContent, Box, Button } from '@mui/material';

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

const WebCamera: React.FC = () => {
    const webcamRef = React.useRef(null);
    const [capturedImage, setCapturedImage] = useState<any>(null);

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    };

    const retakePicture = () => {
        setCapturedImage(null);
    };

    const uploadImage = () => {
        // Add your image upload logic here
        console.log('Uploading image:', capturedImage);
        // Reset capturedImage state after upload
        setCapturedImage(null);
    };

    return (
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
                        <Button variant="contained" color="primary" onClick={uploadImage} disabled={!capturedImage}>
                            Upload
                        </Button>
                    </Box>
                    {capturedImage && (
                        <Box mt={2}>
                            <img src={capturedImage} alt="Captured" style={{ width: '100%' }} />
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default WebCamera;