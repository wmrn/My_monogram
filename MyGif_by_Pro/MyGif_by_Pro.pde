//テクスチャ？がきれいに晴れてなさそう？
//それか近すぎる？
//three.jsに移る。
//Gif出力まではやってない
import saito.objloader.*;
OBJModel model;

import gifAnimation.*;
Gif W;

void setup() {
  size(400, 400, P3D);
  model = new OBJModel(this, "M.obj", "absolute", TRIANGLES);
  model.scale(50);

  frameRate(100);  
  W = new Gif(this, "W.gif");
  W.loop();
  noStroke();
}

void draw() {
  background(255);
  camera(mouseX, mouseY, 100, width/2, height, -250, 0, 1, 0);
  //0,0 or 357,137
  translate(width/2, height, 0);
  drawTexture();
  pushMatrix();
  translate(8, 0, -320);
  model.draw();
  popMatrix();
}

void mousePressed() {
  println(mouseX+","+mouseY);
}

void drawTexture() {
  beginShape(QUADS);
  texture(W);
  vertex(-250, 0, -500, 0, 0);
  vertex(250, 0, -500, 500, 0);
  vertex(250, 0, 0, 500, 500);
  vertex(-250, 0, 0, 0, 500);
  endShape();
}

