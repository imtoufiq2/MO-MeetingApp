import * as faceapi from 'face-api.js';

const loadModels = async () => {
  await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
  await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
  await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
};

const getFaceDescriptor = async (image) => {
  const detections = await faceapi.detectSingleFace(image)
    .withFaceLandmarks()
    .withFaceDescriptor();
  return detections ? detections.descriptor : null;
};

const registerUser = async (imageData) => {
  const img = document.createElement('img');
  img.src = imageData;
  img.onload = async () => {
    const descriptor = await getFaceDescriptor(img);
    if (descriptor) {
      localStorage.setItem('userFaceDescriptor', JSON.stringify(descriptor));
      alert('User registered successfully!');
    }
  };
};

export { loadModels, registerUser };
