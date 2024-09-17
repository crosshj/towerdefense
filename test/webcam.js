const videoElement = document.getElementById('webcam');

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	navigator.mediaDevices
		.getUserMedia({ video: true })
		.then((stream) => {
			videoElement.srcObject = stream;
		})
		.catch((err) => {
			console.error('Error accessing webcam: ', err);
		});
} else {
	alert('getUserMedia not supported by your browser');
}
