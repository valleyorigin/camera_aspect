async function startVideo() {
    try {
        const constraints = {
            video: {
                facingMode: { exact: "environment" },
                width: { ideal: 1920 },
                height: { ideal: 1080 }
            }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const videoElement = document.getElementById('video');
        videoElement.srcObject = stream;
        
        // 初期状態で中央に表示されるようにする
        videoElement.style.transform = 'translate(-50%, -50%) scale(1, 1)';
        
    } catch (error) {
        console.error('Error accessing media devices.', error);
    }
}

function updateSize() {
    const widthSlider = document.getElementById('widthSlider').value;
    const heightSlider = document.getElementById('heightSlider').value;
    const videoElement = document.getElementById('video');
    const currentWidth = document.getElementById('currentWidth');
    const currentHeight = document.getElementById('currentHeight');

    videoElement.style.transform = `translate(-50%, -50%) scale(${widthSlider / 100}, ${heightSlider / 100})`;

    currentWidth.textContent = `${widthSlider}%`;
    currentHeight.textContent = `${heightSlider}%`;
}

function updateMinMax() {
    const minValue = document.getElementById('minValue').value;
    const maxValue = document.getElementById('maxValue').value;
    const widthSlider = document.getElementById('widthSlider');
    const heightSlider = document.getElementById('heightSlider');

    widthSlider.min = minValue;
    widthSlider.max = maxValue;
    heightSlider.min = minValue;
    heightSlider.max = maxValue;
}

function resetAspectRatio() {
    const widthSlider = document.getElementById('widthSlider');
    const heightSlider = document.getElementById('heightSlider');
    const videoElement = document.getElementById('video');
    const currentWidth = document.getElementById('currentWidth');
    const currentHeight = document.getElementById('currentHeight');

    widthSlider.value = 100;
    heightSlider.value = 100;
    videoElement.style.transform = 'translate(-50%, -50%) scale(1, 1)';

    currentWidth.textContent = '100%';
    currentHeight.textContent = '100%';
}

function takePhoto() {
    const videoElement = document.getElementById('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // ビデオ要素から現在の縦横比の設定を取得
    const widthSlider = document.getElementById('widthSlider').value;
    const heightSlider = document.getElementById('heightSlider').value;

    // キャンバスのサイズをビデオのサイズと縦横比に合わせて設定
    const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
    let canvasWidth, canvasHeight;
    if (aspectRatio >= 1) {
        canvasWidth = Math.min(videoElement.videoWidth, videoElement.videoHeight * (widthSlider / heightSlider));
        canvasHeight = canvasWidth / aspectRatio;
    } else {
        canvasHeight = Math.min(videoElement.videoHeight, videoElement.videoWidth * (heightSlider / widthSlider));
        canvasWidth = canvasHeight * aspectRatio;
    }
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // ビデオフレームをキャプチャしてキャンバスに描画
    context.drawImage(videoElement, 0, 0, canvasWidth, canvasHeight);

    // キャンバスのデータを画像として取得し、ダウンロードする
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'photo.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

window.addEventListener('load', startVideo);
