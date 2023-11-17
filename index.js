function random_rgba() {
  var o = Math.round, rand = Math.random, s = 255;
  
  var rgbaList = [], r, g, b, a;
  var r = o(rand()*s);
  var g = o(rand()*s);
  var b = o(rand()*s);
  var a = rand();

  rgbaList.push(r, g, b, a);

  return rgbaList;
}

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function Star(p1, p2, rgbaList) {
  this.p1 = p1;
  this.p2 = p2;
  this.r = rgbaList[0];
  this.g = rgbaList[1];
  this.b = rgbaList[2];
  this.a = rgbaList[3];
  this.glow = (Math.random() < 0.5);
}

function generateStars() {
  function randomCoordX() { return Math.random() * window.innerWidth | 0; }
  function randomCoordY() { return Math.random() * window.innerHeight | 0; }
  var size = 3;
  
  var stars = [];

  var numberOfStars = (window.innerWidth * window.innerHeight) / 2000;

  for (i = 0; i < numberOfStars; i++) {
    // var size = Math.floor(Math.random() * 3) + 1;
    x = randomCoordX();
    y = randomCoordY();
    s = new Star(new Point(x, y), new Point(x + size, y + size), random_rgba());
    stars.push(s);
  }
  return stars;
}

function drawStarsInitial(stars) {
  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  stars.forEach(function (s) {
      ctx.lineWidth = 1;
      ctx.strokeRect(s.p1.x + 0.5, s.p1.y + 0.5, s.p2.x - s.p1.x - 1, s.p2.y - s.p1.y - 1);
      ctx.fillStyle = 'rgba(' + s.r + ',' + s.g + ',' + s.b + ',' + s.a + ')';
      ctx.fillRect(s.p1.x + 0.5, s.p1.y + 0.5, s.p2.x - s.p1.x - 1, s.p2.y - s.p1.y - 1);
  });
}

function sparkleStars(stars) {
  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;


  stars.forEach(function (s) {
    if (s.glow) {
      s.a += 0.01;
      if (s.a >= 1) {
        s.glow = false;
      }
    } else {
      s.a -= 0.01;
      if (s.a <= -0.1) {
        s.glow = true;
      }
    }
    ctx.lineWidth = 1;
    ctx.strokeRect(s.p1.x + 0.5, s.p1.y + 0.5, s.p2.x - s.p1.x - 1, s.p2.y - s.p1.y - 1);
    ctx.fillStyle = 'rgba(' + s.r + ',' + s.g + ',' + s.b + ',' + s.a + ')';
    ctx.fillRect(s.p1.x + 0.5, s.p1.y + 0.5, s.p2.x - s.p1.x - 1, s.p2.y - s.p1.y - 1);
  })
  function helper(timeframe) {
    sparkleStars(stars);
  }
  requestAnimationFrame(helper);
}

function myFunction() { 
  document.getElementById("demo").innerHTML = "What's good";
}

var stars = generateStars();
drawStarsInitial(stars);
sparkleStars(stars);
