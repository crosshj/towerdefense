const videoElement = document.getElementById('webcam');
const cameraSelect = document.getElementById('cameraSelect');

let currentStream = null;

async function getCameras() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(device => device.kind === 'videoinput');

  cameraSelect.innerHTML = '';
  videoDevices.forEach((device, index) => {
    const option = document.createElement('option');
    option.value = device.deviceId;
    option.text = device.label || `Camera ${index + 1}`;
    cameraSelect.appendChild(option);
  });
}

async function startStream(deviceId) {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
  }

  const constraints = {
    video: {
      deviceId: deviceId ? { exact: deviceId } : undefined
    }
  };

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = stream;
    currentStream = stream;
  } catch (err) {
    console.error('Error accessing webcam:', err);
  }
}

cameraSelect.addEventListener('change', () => {
  startStream(cameraSelect.value);
});

async function init() {
  await getCameras();
  if (cameraSelect.options.length > 0) {
    startStream(cameraSelect.value);
  }
}

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  init();
} else {
  alert('getUserMedia not supported by your browser');
}
