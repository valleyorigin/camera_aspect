async function startVideo() {
    try {
        const constraints = {
            video: {
                facingMode: { exact: "user" },
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

// ページ読み込み後にビデオを開始
window.addEventListener('load', startVideo);
