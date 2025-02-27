let grotesk;
let fontSize = 200;
let letters = "SLICE".split("");
let letterGroups = {};
let letterOffsets = {};

function preload() {
  grotesk = loadFont('grotesk.otf');
}

function setup() {
  createCanvas(800, 400);
  textFont(grotesk);
  textSize(fontSize);
  noStroke();

  // Centers text
  let totalWidth = textWidth("SLICE");
  let startX = width / 2 - totalWidth / 2;
  let textY = height / 2;

  // Process each letter.
  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    let key = letter + "_" + i;
    let pts = grotesk.textToPoints(letter, startX, textY, fontSize, { sampleFactor: 0.3 });

    
  //finds midpoint 
    let minY = Infinity, maxY = -Infinity;
    pts.forEach(pt => {
      if (pt.y < minY) minY = pt.y;
      if (pt.y > maxY) maxY = pt.y;
    });
    let midY = (minY + maxY) / 2;

    // Split into top and bottom groups.
    letterGroups[key] = {
      top: pts.filter(pt => pt.y < midY),
      bottom: pts.filter(pt => pt.y >= midY)
    };

  
    letterOffsets[key] = {
      top: { x: 0, y: 0 },
      bottom: { x: 0, y: 0 }
    };

    startX += textWidth(letter);
  }
}

function draw() {
  background(0);

  
  let maxOffset = 150;
  let factor = mouseX <= 70 ? 0 : map(mouseX, 20, width, 0, maxOffset);

  
  for (let key in letterOffsets) {
    letterOffsets[key].top.x = -factor;
    letterOffsets[key].bottom.x = factor;
  }

  // Draw each letter's groups.
  for (let key in letterGroups) {
    let group = letterGroups[key];
    let offsetTop = letterOffsets[key].top;
    let offsetBottom = letterOffsets[key].bottom;

    fill('cyan');
    group.top.forEach(pt => ellipse(pt.x + offsetTop.x, pt.y + offsetTop.y, 5, 5));

    fill('magenta');
    group.bottom.forEach(pt => ellipse(pt.x + offsetBottom.x, pt.y + offsetBottom.y, 5, 5));
  }
}
