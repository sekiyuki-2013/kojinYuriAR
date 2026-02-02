const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const chara = new Image();
chara.src = "linksShark.PNG"; // 2Dキャラ画像

// 外カメラ起動
navigator.mediaDevices.getUserMedia({
  video: {
    facingMode: { ideal: "environment" }
  },
  audio: false
}).then(stream => {
  video.srcObject = stream;
});

// 描画ループ
function draw() {
  if (video.videoWidth === 0) {
    requestAnimationFrame(draw);
    return;
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // カメラ
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // キャラ（右側に立たせる例）
  const size = canvas.width * 0.8;
  ctx.drawImage(
    chara,
    canvas.width - size - 100,
    canvas.height - size - 100,
    size,
    size
  );

  requestAnimationFrame(draw);
}

draw();
