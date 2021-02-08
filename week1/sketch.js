let canvasWidth = 800;
let canvasHeight = 600;
let videoWidth = canvasWidth / 2;
let videoHeight = canvasHeight / 2;
let myVideo = null;
let otherVideos = [];
let roomName = "8-bit Room";

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  let constraints = {
    audio: true,
    video: true
  };
  myVideo = createCapture(constraints,
    function(stream) {
      let p5l = new p5LiveMedia(this, "CAPTURE", stream, roomName);
      p5l.on('stream', gotStream);
    }
  );
  myVideo.size(videoWidth, videoHeight);
  myVideo.elt.muted = true;
  myVideo.hide();
  noStroke();
}

function drawVideo(video, baseX, baseY) {
  push();
  translate(baseX, baseY);
  video.loadPixels();
  const stepSize = Math.round(video.height / 36);
  for (let y = 0; y < video.height; y += stepSize) {
    for (let x = 0; x < video.width; x += stepSize) {
      const i = y * video.width + x;
      let r = video.pixels[4 * i];
      let g = video.pixels[4 * i + 1];
      let b = video.pixels[4 * i + 2];
      r = Math.round((r + 1) / 16) * 16 - 1;
      g = Math.round((g + 1) / 16) * 16 - 1;
      b = Math.round((b + 1) / 16) * 16 - 1;
      fill(color(r, g, b));
      rect(x, y, stepSize, stepSize);
    }
  }
  pop();
}

function draw() {
  if (myVideo != null) {
    drawVideo(myVideo, 0, 0);
  }
  
  for (let i = 0; i < otherVideos.length; i++) {
    drawVideo(otherVideos[i], i % 2 ? 0 : videoWidth, i > 0 ? videoHeight : 0);
  }
}

// This function is called every time there is a new stream
function gotStream(stream, id) {
  if (otherVideos.length < 3) {
    let otherVideo = stream;
    otherVideo.size(videoWidth, videoHeight);
    otherVideo.hide();
    otherVideos.push(otherVideo); 
  }  
}