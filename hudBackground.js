const canvas = document.getElementById('hud-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let width = canvas.width;
let height = canvas.height;

function drawGrid() {
  ctx.clearRect(0, 0, width, height);
  
  ctx.strokeStyle = "rgba(0, 150, 255, 0.2)";
  ctx.lineWidth = 1;

  const spacing = 40;
  for(let x=0;x<width;x+=spacing){
    ctx.beginPath();
    ctx.moveTo(x,0);
    ctx.lineTo(x,height);
    ctx.stroke();
  }

  for(let y=0;y<height;y+=spacing){
    ctx.beginPath();
    ctx.moveTo(0,y);
    ctx.lineTo(width,y);
    ctx.stroke();
  }
}

let offset = 0;
function animate(){
  offset += 0.5;
  ctx.setTransform(1,0,0,1,0,offset);
  drawGrid();
  ctx.setTransform(1,0,0,1,0,0);
  requestAnimationFrame(animate);
}

window.addEventListener("resize", ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  width = canvas.width;
  height = canvas.height;
});

animate();
