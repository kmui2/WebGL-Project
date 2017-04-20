var Plane = function() {

}
Plane.prototype.draw = function() {
  pushMatrix();
  scale([15,5,5]);
  rotate(rad(90),[0,0,1]);
  createBuffers('cylinder');
  popMatrix();

  pushMatrix();
  translate([10,0,0]);
  scale([5,5,5]);
  rotate(rad(-90),[0,0,1]);
  createBuffers('truncatedCone');
  popMatrix();

  pushMatrix();
  rotateFromPiv([12,5,0,0],rad(counter*100),[1,0,0]);
  scale([0.5,5,1.5]);
  createBuffers('cube');
  popMatrix();

  pushMatrix();
  rotateFromPiv([12,5,0,0],rad(counter*100+120),[1,0,0]);
  scale([0.5,5,1.5]);
  createBuffers('cube');
  popMatrix();

  pushMatrix();
  rotateFromPiv([12,5,0,0],rad(counter*100+240),[1,0,0]);
  scale([0.5,5,1.5]);
  createBuffers('cube');
  popMatrix();

  pushMatrix();
  translate([0,2,0]);
  scale([5,5,2.5]);
  createBuffers('sphere');
  popMatrix();

  pushMatrix();
  translate([-10,0,0]);
  scale([5,5,5]);
  rotate(rad(90),[0,0,1]);
  createBuffers('truncatedCone');
  popMatrix();

  pushMatrix();
  translate([-10,0,0]);
  scale([3,1,20]);
  createBuffers('cube');
  popMatrix();

  pushMatrix();
  translate([-12,5,0]);
  rotate(rad(45),[0,0,1]);
  scale([3,10,1]);
  createBuffers('cube');
  popMatrix();

  pushMatrix();
  translate([0,0,7]);
  rotate(rad(-45),[0,1,0]);
  scale([5,1.5,10]);
  createBuffers('cube');
  popMatrix();

  pushMatrix();
  translate([0,0,-7]);
  rotate(rad(45),[0,1,0]);
  scale([5,1.5,10]);
  createBuffers('cube');
  popMatrix();

  pushMatrix();
  translate([0,-4,0]);
  rotate(rad(45),[1,0,0]);
  scale([0.5,6,0.5]);
  createBuffers('cube');
  popMatrix();

  pushMatrix();
  translate([0,-7,2]);
  scale([1,1,2]);
  rotate(rad(90),[1,0,0]);
  createBuffers('cylinder');
  popMatrix();

  pushMatrix();
  translate([0,-4,0]);
  rotate(rad(-45),[1,0,0]);
  scale([0.5,6,0.5]);
  createBuffers('cube');
  popMatrix();

  pushMatrix();
  translate([0,-7,-2]);
  scale([1,1,2]);
  rotate(rad(90),[1,0,0]);
  createBuffers('cylinder');
  popMatrix();

}
