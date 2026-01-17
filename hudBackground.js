const canvas = document.getElementById("hud-bg");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let offset = 0;

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle = "rgba(0,160,255,0.15)";
  ctx.lineWidth = 1;

  const size = 50;
  offset = (offset + 0.3) % size;

  for (let x = -size; x < canvas.width + size; x += size) {
    ctx.beginPath();
    ctx.moveTo(x + offset, 0);
    ctx.lineTo(x + offset, canvas.height);
    ctx.stroke();
  }

  for (let y = -size; y < canvas.height + size; y += size) {
    ctx.beginPath();
    ctx.moveTo(0, y + offset);
    ctx.lineTo(canvas.width, y + offset);
    ctx.stroke();
  }

  requestAnimationFrame(draw);
}
draw();
