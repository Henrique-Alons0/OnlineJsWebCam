(function () {
  if (
    !"mediaDevices" in navigator ||
    !"getUserMedia" in navigator.mediaDevices
  ) {
    alert("Camera API is not available in your browser");
    return;
  }

  // get page elements
  const video = document.querySelector("#cameraData");
  const btnPlay = document.querySelector("#buttonCodeCapture");
  const btnPause = document.querySelector("#closeCamera");
  const btnScreenshot = document.querySelector("#btnScreenshot");
  const downloader = document.querySelector("#imageDownloader");
  // const btnChangeCamera = document.querySelector("#btnChangeCamera");
  // const screenshotsContainer = document.querySelector("#screenshots");
  const canvas = document.querySelector("#imageCapture");
  // const devicesSelect = document.querySelector("#devicesSelect");


  // video constraints
  const constraints = {
    video: {
      width: {
        min: 1280,
        ideal: 1920,
        max: 2560,
      },
      height: {
        min: 720,
        ideal: 1080,
        max: 1440,
      },
    },
  };

  // use front face camera
  let useFrontCamera = true;

  // current video stream
  let videoStream;

  btnPlay.disabled = false;
  btnPause.disabled = true;
  btnScreenshot.disabled = true;

  // handle events
  // play
  btnPlay?.addEventListener("click", function () {
    initializeCamera();
    video.play();
    btnPlay.disabled = true;
    btnPause.disabled = false;
    btnScreenshot.disabled = false;

  });

  // pause
  btnPause?.addEventListener("click", function () {
    btnPlay.disabled = false;
    btnPause.disabled = true;
    btnScreenshot.disabled = true;
    stopVideoStream();
  });

  // take screenshot
  btnScreenshot?.addEventListener("click", function () {
    if (videoStream) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      downloadPng();
    }
  });

  // stop video stream
  function stopVideoStream () {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    document.getElementById('cameraData').remove();
    document.getElementById('videoData').innerHTML = '<video id="cameraData"><p>Não foi possível carregar a camera, tente novamente!</p></video>';
  }

  function downloadPng()
  {
    let image = canvas.toDataURL("image/png");
    
    downloader.href = image;
    downloader.click();
  }

  // initialize
  async function initializeCamera() {
    constraints.video.facingMode = useFrontCamera ? "user" : "environment";

    const video = document.querySelector('#cameraData');
    try {
      videoStream = await navigator.mediaDevices.getUserMedia(constraints);
      videoStream.getTracks().forEach((track) => {
        TextTrackList;
      });
      video.srcObject = videoStream;
      video.onloadedmetadata = () => {
        video.play();
      };
    } catch (err) {
      alert("Could not access the camera");
    }
  }
})();