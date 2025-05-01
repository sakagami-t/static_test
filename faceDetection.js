const faceapi = require('face-api.js');

async function loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
}

async function detectFaces(video) {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
    return detections;
}

function drawDetections(video, detections) {
    const canvas = document.createElement('canvas');
    canvas.width = video.width;
    canvas.height = video.height;
    const context = canvas.getContext('2d');
    context.strokeStyle = 'red';
    context.lineWidth = 2;

    detections.forEach(detection => {
        const { x, y, width, height } = detection.box;
        context.strokeRect(x, y, width, height);
    });

    document.body.append(canvas);
}

module.exports = { loadModels, detectFaces, drawDetections };
