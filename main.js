var canvas, gl, m4, v3, p;
var forward, turn, lift, x, y, z;
var counter, time, pattern;

var Tcamera, Tprojection, Tmcp, buffers, coord, matrixStack, 
    Tmc, Tmodel, rotator, inColor, shaders, texture;

function setup() {
  "use strict";

  // first we need to get the canvas and make an OpenGL context
	// in practice, you need to do error checking
  canvas = document.getElementById("mycanvas");
  gl =twgl.getWebGLContext(canvas);
  m4 = twgl.m4;
  v3 = twgl.v3;
  p = twgl.primitives;
    
  forward = 0;
  turn = 0;
  lift = 0;
  x = 0;
  y = 0;
  z = 10;

  counter = 0;
  time = 0.0;
  pattern = true;
    
    
  Tprojection = m4.perspective(Math.PI/3,1,1,400);
  matrixStack = [];
  Tmc = m4.identity();
  Tmodel = m4.identity();
  rotator = new SimpleRotator(canvas);
  rotator.setViewDistance(10);
  inColor = [1.0,0.0,0.0]
  
  initControls();



  // with twgl, the shaders get moved to the html file
  shaders = twgl.createProgramInfo(gl, ["vs", "fs"]);// let's define the vertex positions

    initPrimitives();

    initOrigTex();

  texture = checkersTex;


  /////////////////////////////
  //
  //    MAIN DRAW FUNCTION
  //
  ////////////////////////////

  function draw() {
      doWebGL();
    if (control.selectedIndex === 0)
      Tcamera = rotator.getViewMatrix();
    else
      Tcamera = drive();
    Tmodel = m4.identity();

    var translate = [0,0,0];
    var scale = [1,1,1];
    var xAngle = [0,0,0];
    var yAngle = [0,0,0];
    var zAngle = [0,0,0];
    inColor = [1.0,1.0,1.0];

    pushMatrix();
    mat4.scale(Tmodel,Tmodel,[0.05*sliderScaleX.value,0.05*sliderScaleY.value,0.05*sliderScaleZ.value]);
    mat4.translate(Tmodel,Tmodel,[sliderX.value*0.1,sliderY.value*0.1,sliderZ.value*0.1]);

    if(checkbox.checked) {
      pushMatrix();
      mat4.scale(Tmodel,Tmodel,[5,5,5]);
      if (view.selectedIndex === 0)
        drawPerson();
      else if (view.selectedIndex === 1){
        //rotateFromPiv([0,0,0],rad(counter*10),[0,1,0]);
        //mat4.translate(Tmodel,Tmodel,[5,0,0]);
        //rotate(rad(-90),[0,1,0])
        texture = steelTex;
        drawTrain();
      }
      else if (view.selectedIndex === 2){
        for (var i = -1; i<=1; i++) {
          for (var j = -1; j<=1; j++) {
            pushMatrix();
            texture = grassTex;
            inColor = [0.0,0.6,0.0];
            mat4.translate(Tmodel,Tmodel,[i*100,0,j*100]);
            drawGround();
            defaultTex();
            popMatrix();
          }
        }
      }
      else if (view.selectedIndex === 3){
        texture = bricksTex;
        drawHouse();
      }
      else if (view.selectedIndex === 4){
        texture = steelTex;
        drawHelicopter();
      }
      else if (view.selectedIndex === 5){
        texture = boulderTex;
        createBuffers('diamond');
      }
      else if (view.selectedIndex === 6){
        texture = boulderTex;
        createBuffers('octagon');
      }
      else if (view.selectedIndex === 7){
        mat4.scale(Tmodel,Tmodel,[0.1,0.1,0.1])
        drawSign();
      }
      else if (view.selectedIndex === 8){
        texture = steelTex;
        drawPlane();
      }
      popMatrix();
    }

    else {
//       pushMatrix();
//       mat4.scale(Tmodel,Tmodel,[5,5,5]);
//       texture = checkersTex;
//       drawHelicopter();
//       rotate(rad(90),[0,1,0]);
//       //drawOctagon();
//       texture = dogTex;
//       createBuffers('sphere');
//       popMatrix();

      //DRAW BACKGROUND
      pushMatrix();
      inColor = [1.5,1.5,1.5];
      texture = backgroundTex;
      var coord = [[0,0,-0.5],[0,-0.5,0],[-0.5,0,0],[0,0,0.5],[0,0.5,0],[0.5,0,0]];
      var x = [1,0,0];
      var y = [0,1,0];
      var z = [0,0,1];
        var textures = [
            centerTex,
            bottomTex,
            leftTex,
            farRightTex,
            topTex,
            rightTex
        ];
      var rotateAxis = [
          [x,z], //center
          [x,y], //bottom
          [z,x], //left
          [x,z], //farRight
          [x,y], //top
          [z,x] //right
      ];
      var rotate = [
          [rad(90),rad(0)], //center
           [rad(0),rad(0)], //bottom
           [rad(-90),rad(90)], //left
           [rad(-90),rad(180)], //farRight
           [rad(180),rad(0)], //top
           [rad(90),rad(90)] //right
      ];

      mat4.scale(Tmodel,Tmodel,[1000,1000,1000]);
      for (var i =0; i<6;i++) {
        pushMatrix();
          texture = textures[i];
        mat4.translate(Tmodel,Tmodel,coord[i]);
        mat4.rotate(Tmodel,Tmodel,rotate[i][1],rotateAxis[i][1]);
        mat4.rotate(Tmodel,Tmodel,rotate[i][0],rotateAxis[i][0]);
        createBuffers('plane', 1.0);
        popMatrix();
      }
      popMatrix();

      //DRAW WORLD
      pushMatrix();
      world();
      popMatrix();
    }
    popMatrix();

    //update
    if(pattern)
      counter+=0.1*slider2.value;
    forward = 0;
    window.requestAnimationFrame(draw);
  }
  

/** Initialization code.
 * If you use your own event management code, change it as required.
 */
if (window.addEventListener)
        /** DOMMouseScroll is for mozilla. */
        window.addEventListener('DOMMouseScroll', wheel, false);
/** IE/Opera. */
window.onmousewheel = document.onmousewheel = wheel;
 
  draw();
}
window.onload = setup;
