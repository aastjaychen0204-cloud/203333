let bubbles = [];
let fishes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 初始化約 150 顆泡泡
  for (let i = 0; i < 150; i++) {
    bubbles.push(new Bubble());
  }
  // 初始化簡潔造型的魚
  for (let i = 0; i < 8; i++) {
    fishes.push(new Fish());
  }
}

function draw() {
  clear(); // 保持背景透明，顯示 CSS 的海水漸層

  // 更新與繪製泡泡
  for (let b of bubbles) {
    b.update();
    b.show();
  }

  // 更新與繪製魚
  for (let f of fishes) {
    f.update();
    f.show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// 泡泡類別
class Bubble {
  constructor() {
    this.reset();
    this.y = random(height); // 初始時隨機分佈
  }

  reset() {
    this.x = random(width);
    this.y = height + random(20, 200);
    this.size = random(15, 50); // 將泡泡直徑範圍從 3-10 提升到 15-50
    this.speed = random(0.8, 3.0); // 大泡泡上升速度稍快，較有力量感
    this.noiseOffset = random(1000); // 隨機 Noise 起點實現不規則跑動
  }

  update() {
    this.y -= this.speed;
    // 使用 Perlin Noise 產生自然的左右不規則晃動
    let wobble = map(noise(this.noiseOffset), 0, 1, -1.5, 1.5);
    this.x += wobble;
    this.noiseOffset += 0.02;

    if (this.y < -this.size) {
      this.reset();
    }
  }

  show() {
    noFill();
    stroke(255, 255, 255, 120);
    strokeWeight(2); // 邊框加粗，讓大泡泡在深色背景中更明顯
    circle(this.x, this.y, this.size);
    
    // 在泡泡內側加入高光圓點，增加透明立體感
    noStroke();
    fill(255, 255, 255, 70);
    ellipse(this.x - this.size * 0.2, this.y - this.size * 0.2, this.size * 0.2);
  }
}

// 簡潔造型的魚類別
class Fish {
  constructor() {
    this.reset();
    this.x = random(width);
  }

  reset() {
    this.direction = random() > 0.5 ? 1 : -1;
    this.x = this.direction === 1 ? -150 : width + 150;
    this.y = random(height * 0.1, height * 0.8);
    this.speed = random(1, 3);
    this.size = random(0.6, 1.1);
    this.color = color(random(['#ff9900', '#ffcc00', '#00ccff', '#ff6666']));
  }

  update() {
    this.x += this.speed * this.direction;
    if ((this.direction === 1 && this.x > width + 200) || (this.direction === -1 && this.x < -200)) {
      this.reset();
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    if (this.direction === -1) scale(-1, 1);
    scale(this.size);
    fill(this.color);
    noStroke();
    ellipse(0, 0, 60, 35); // 魚身
    triangle(20, 0, 45, -15, 45, 15); // 魚尾
    pop();
  }
}