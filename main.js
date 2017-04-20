function setup() {
  "use strict";

  // first we need to get the canvas and make an OpenGL context
	// in practice, you need to do error checking
  var canvas = document.getElementById("mycanvas");
  var gl =twgl.getWebGLContext(canvas);
  var m4 = twgl.m4;
  var v3 = twgl.v3;
  var p = twgl.primitives;
  var forward = 0;
  var turn = 0;
  var lift = 0;
  var x = 0;
  var y = 0;
  var z = 10;

  var counter = 0;
  var time = 0.0;
  var pattern = true;
  var Tcamera
  var Tprojection = m4.perspective(Math.PI/3,1,1,400);
  var Tmcp
  var buffers
  var coord
  var matrixStack = [];
  var Tmc = m4.identity();
  var Tmodel = m4.identity();
  var rotator = new SimpleRotator(canvas);
  rotator.setViewDistance(10);
  var inColor = [1.0,0.0,0.0]
  var texture;
  var texURL;

  var control = document.getElementById('control');

  var view = document.getElementById('view');

  //pattern is actually the pause/play button
  var togglePattern = document.getElementById('pattern');
  var reset = document.getElementById('reset');

  //Rotate
  var slider2 = document.getElementById('slider2');
  slider2.value = -1;

  //Rotate
  var sliderDay = document.getElementById('day');
  sliderDay.value = 0;

  //**Translating**//
  //X
  var sliderX = document.getElementById('sliderX');
  sliderX.value = 0;

  //Y
  var sliderY = document.getElementById('sliderY');
  sliderY.value = 0;

  //Z
  var sliderZ = document.getElementById('sliderZ');
  sliderZ.value = 0;

  //**Scaling**//
  //X
  var sliderScaleX = document.getElementById('sliderScaleX');
  sliderScaleX.value = 5;

  //Y
  var sliderScaleY = document.getElementById('sliderScaleY');
  sliderScaleY.value = 5;

  //Z
  var sliderScaleZ = document.getElementById('sliderScaleZ');
  sliderScaleZ.value = 5;

  //Examine
  var checkbox = document.getElementById('examine');


  // with twgl, the shaders get moved to the html file
  var shaders = twgl.createProgramInfo(gl, ["vs", "fs"]);// let's define the vertex positions

//
//  var truncatedConeBuffer = p.createTruncatedConeBufferInfo(gl,1,0.5,1,10,10);
//  var torusBuffer = p.createTorusBufferInfo(gl,1,0.5,10,10);
//  var planeBuffer = p.createPlaneBufferInfo(gl);
//  var cresentBuffer = p.createCresentBufferInfo(gl,2,1,0.1,1,10,2);
//  var discBuffer = p.createDiscBufferInfo(gl,1,10,10,0.5,10);
//  var sphereBuffer = p.createSphereBufferInfo(gl,1,10,10);
//  var skyBoxBuffer = p.createSphereBufferInfo(gl,1,10,10);
//  var cubeBuffer = p.createCubeBufferInfo(gl);
//  var cylinderBuffer = p.createCylinderBufferInfo(gl,1,1,10,10);
//
//    var octagonVertexPos = [
//    //front
//      //first row
//         -1.0,  1.0 + 2/Math.sqrt(2),  1.0,  //0
//        1.0,  1.0 + 2/Math.sqrt(2),  1.0,    //1
//      //second row
//         -1.0 - 2/Math.sqrt(2),  1.0,  1.0,  //2
//         -1.0, 1.0,  1.0,                    //3
//        1.0,  1.0,  1.0,                     //4
//         1.0+2/Math.sqrt(2),  1.0,  1.0,     //5
//      //third row
//        -1.0-2/Math.sqrt(2),-1.0,1.0,        //6
//        -1.0,-1.0,1.0,                       //7
//        1.0,-1.0,1.0,                        //8
//        1.0+2/Math.sqrt(2),-1.0,1.0,         //9
//      //fourth row
//        -1.0,-1.0-2/Math.sqrt(2),1.0,        //10
//        1.0,-1.0-2/Math.sqrt(2),1.0,         //11
//
//    //back
//      //first row
//         -1.0,  1.0 + 2/Math.sqrt(2),  -1.0,  //12
//        1.0,  1.0 + 2/Math.sqrt(2),  -1.0,    //13
//      //second row
//         -1.0 - 2/Math.sqrt(2),  1.0,  -1.0,  //14
//         -1.0, 1.0,  -1.0,                    //15
//        1.0,  1.0,  -1.0,                     //16
//         1.0+2/Math.sqrt(2),  1.0,  -1.0,     //17
//      //third row
//        -1.0-2/Math.sqrt(2),-1.0,-1.0,        //18
//        -1.0,-1.0,-1.0,                       //19
//        1.0,-1.0,-1.0,                        //20
//        1.0+2/Math.sqrt(2),-1.0,-1.0,         //21
//      //fourth row
//        -1.0,-1.0-2/Math.sqrt(2),-1.0,        //22
//       1.0,-1.0-2/Math.sqrt(2),-1.0,         //23
//   ];
//  var octagonTriangleIndices = [
//    3,0,2, 4,1,0, 0,3,4, 1,4,5, 2,6,3, 7,3,6, 7,4,3, 7,8,4, 8,5,4, 5,8,9, 10,7,6, 10,8,7, 10,11,8, 11,9,8,
//    0,1,12, 13,12,1, 17,13,1, 17,1,5, 21,17,5, 21,5,9, 23,21,9, 23,9,11, 10,22,23, 23,11,10, 6,18,22, 22,10,6, 14,18,6, 6,2,14, 12,14,2, 2,0,12,
//    12,13,16, 16,15,12, 13,17,16, 16,17,21, 21,20,16, 20,21,23, 23,22,20, 22,19,20, 18,19,22, 18,14,15, 15,19,18, 15,16,20, 20,19,15, 15,14,12
//
//  ];
//      var octagonVertexNormals = [
//    //front
//      //first row
//         -1.0, 1.0, 1.0, //0
//        1.0, 1.0, 1.0,   //1
//      //second row
//        -1.0, 1.0, 1.0,  //2
//        0.0, 0.0, 1.0,   //3
//        0.0, 0.0, 1.0,   //4
//        1.0, 1.0, 1.0,   //5
//      //third row
//        -1.0, 1.0, 1.0,  //6
//        0.0, 0.0, 1.0,   //7
//        0.0, 0.0, 1.0,   //8
//        1.0, -1.0, 1.0,  //9
//      //fourth row
//        -1.0, -1.0, 1.0, //10
//        1.0, -1.0, 1.0,  //11
//
//    //back
//      //first row
//         -1.0, 1.0, -1.0,  //12
//        1.0, 1.0, -1.0,   //13
//      //second row
//        -1.0, 1.0, -1.0,  //14
//        0.0, 0.0, -1.0,   //15
//        0.0, 0.0, -1.0,   //16
//        1.0, 1.0, -1.0,   //17
//      //third row
//        -1.0, 1.0, -1.0,  //18
//        0.0, 0.0, -1.0,   //19
//        0.0, 0.0, -1.0,   //20
//        1.0, -1.0, -1.0,  //21
//      //fourth row
//        -1.0, -1.0, -1.0, //22
//        1.0, -1.0, -1.0,  //23
//  ];
//  var octagonTexCoords = [
//    0.33, 1.0,
//    0.66, 1.0,
//    0.0, 0.66,
//    0.33, 0.66,
//    0.66, 0.66,
//    1.0, 0.66,
//    0.0, 0.33,
//    0.33, 0.33,
//    0.66, 0.33,
//    1.0, 0.33,
//    0.33, 0.0,
//    0.66, 0.0,
//
//    0.33, 1.0,
//    0.66, 1.0,
//    0.0, 0.66,
//    0.33, 0.66,
//    0.66, 0.66,
//    1.0, 0.66,
//    0.0, 0.33,
//    0.33, 0.33,
//    0.66, 0.33,
//    1.0, 0.33,
//    0.33, 0.0,
//    0.66, 0.0,
//  ]
//  var arrays = {position:octagonVertexPos,
//                 indices:octagonTriangleIndices,
//                     inColor:inColor,
//                       normal: octagonVertexNormals,
//                         texcoord: octagonTexCoords,};
//    var octagonBuffer = twgl.createBufferInfoFromArrays(gl, arrays);
//
//    var diamondVertexPos = [
//    //top
//      0.0, 1, 0.0,    //0
//    //bottom square
//      -0.5, 0, 0.5,  //1
//      -0.5, 0, -0.5, //2
//      0.5, 0, 0.5,   //3
//      0.5, 0, -0.5,   //4
//    //bottom
//      0.0, -1, 0.0, //5
//   ];
//  var diamondTriangleIndices = [
//      3,1,5, 4,3,5, 2,4,5, 2,5,1, 1,3,0, 3,4,0, 4,2,0, 1,0,2,
//  ];
//    var diamondVertexNormals = [
//      0.0, 1.0, 0.0,   //0
//      -1.0, 0.0, 1.0, //1
//      -1.0, 0.0, -1.0,//2
//      1.0, 0.0, 1.0,  //3
//      1.0, 0.0, -1.0,  //4
//      0.0, -1.0, 0.0,   //5
//    ];
//  var diamondTexCoord = [
//    0.5, 0.5,
//    0.0, 0.0,
//    0.0, 1.0,
//    1.0, 0.0,
//    1.0, 1.0,
//    0.5, 0.5,
//  ]
//   arrays = {position:diamondVertexPos,
//                 indices:diamondTriangleIndices,
//                     inColor:inColor,
//                       normal:diamondVertexNormals,
//                          texcoord: diamondTexCoord,};
//   var diamondBuffer = twgl.createBufferInfoFromArrays(gl, arrays);
//
//    var pyramidVertexPos = [
//    //top
//      0.0, 0.5, 0.0,    //0
//    //bottom square
//      -0.5, -0.5, 0.5,  //1
//      -0.5, -0.5, -0.5, //2
//      0.5, -0.5, 0.5,   //3
//      0.5, -0.5, -0.5   //4
//   ];
//  var pyramidTriangleIndices = [
//    1,2,3, 2,4,3, 1,3,0, 3,4,0, 4,2,0, 1,0,2
//  ];
//    var pyramidVertexNormals = [
//      0.0, 1.0, 0.0,   //0
//      -1.0, 0.0, 1.0, //1
//      -1.0, 0.0, -1.0,//2
//      1.0, 0.0, 1.0,  //3
//      1.0, 0.0, -1.0  //4
//    ];
//  var pyramidTexCoords = [
//    0.5, 0.5,
//    0.0, 0.0,
//    0.0, 1.0,
//    1.0, 0.0,
//    1.0, 1.0,
//  ]
//  arrays = {position:pyramidVertexPos,
//                 indices:pyramidTriangleIndices,
//                     inColor:inColor,
//                       normal:pyramidVertexNormals,
//                         texcoord: pyramidTexCoords,
//           };
//   var pyramidBuffer = twgl.createBufferInfoFromArrays(gl, arrays);
    
    initPrimitives();

  var checkersTex = initTex("checkers");
  var dogTex = initTex("dog");
  var apartmentTex = initTex("apartment");
  var bricksTex = initTex("bricks");
  var roofTex = initTex("roof");
  var grassTex = initTex("grass");
  var backgroundTex = initTex("background");
  var steelTex = initTex("steel");
  var mirrorTex = initTex("mirror");
  var boulderTex = initTex("boulder");
  var faceTex = initTex("face");
  var bodyTex = initTex("body");
  var snakeTex = initTex("snake");
   var topTex = initTex("top");
   var leftTex = initTex("left");
   var rightTex = initTex("right");
   var centerTex = initTex("center");
   var bottomTex = initTex("bottom");
   var farRightTex = initTex("farRight");

  texture = checkersTex;

  function initTex(texName) {
    // Set up texture
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    var image = new Image();

    image.onload = LoadTexture;
    image.crossOrigin = "anonymous";
      image=origTex(texName,image);

    function LoadTexture()
      {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

      // Optional ... if your shader & texture coordinates go outside the [0,1] range
      //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
      }
    return texture;
  }







  /////////////////////////////
  //
  //    MAIN DRAW FUNCTION
  //
  ////////////////////////////

  function draw() {
	  // first, let's clear the screen
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(shaders.program);

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

  ////////////////////
  //   WORLD
  ///////////////////

  function world() {
    pushMatrix();

    //PLANE
    pushMatrix();
    inColor = [1.0,1.0,1.0];
    texture = steelTex;
    translate([0,50,-100]);
    var count = (-counter*0.1)%2;
    //console.log(count);
    var up = [0,1,0]
    var t;
    var p0;
    var d0;
    var p1;
    var d1;
    if(count<1) {
     t = count;
     p0=[0,0,0];
     d0=[500,0,0];
     p1=[0,0,200];
     d1=[200,-200,0];
    }
    else {
     t = count-1;
     p1=[0,0,0];
     d1=[500,0,0];
     p0=[0,0,200];
     d0=[200,-200,0];
    }

    var P = [p0,d0,p1,d1]; // All the control points

    var Tmodel_trans=m4.translation(Cubic(Hermite,P,t));
    var Tmodel_rot=m4.lookAt([0,0,0],Cubic(HermiteDerivative,P,t),up);
    var temp=m4.multiply(Tmodel_rot,Tmodel_trans);
    mat4.mul(Tmodel,Tmodel,temp)
    rotate(rad(90),[0,1,0]);
    drawPlane();
    popMatrix();

    //person
    pushMatrix();
    rotateFromPiv([0,0,0],rad(counter*10),[0,1,0]);
    translate([10,2,0]);
    drawPerson();
    popMatrix();

    //ground
    for (var i = -1; i<=1; i++) {
      for (var j = -1; j<=1; j++) {
        pushMatrix();
        texture = grassTex;
        inColor = [0.0,0.6,0.0];
        translate([i*100,0,j*100]);
        drawGround();
        defaultTex();
        popMatrix();
      }
    }
    inColor = [1.0,1.0,1.0];

    //house
    pushMatrix();
    translate([0,5,0])
    scale([3,3,3]);
    texture = bricksTex;
    drawHouse();
    defaultTex();
    popMatrix();

    //apartment
    pushMatrix();
    translate([20,15,30])
    scale([5,10,5]);
    texture = apartmentTex;
    drawHouse();
    popMatrix();

    //TRAIN
    pushMatrix();
    rotateFromPiv([1,1,1],rad(counter*10),[0,1,0]);
    translate([20,7,0]);
    rotate(rad(-90),[0,1,0])
    scale([5,5,5]);
    drawTrain();
    defaultTex();
    popMatrix();

    //HELICOPTER
    pushMatrix();
    translate([0,0,-50]);
    rotateFromPiv([0,5,0],rad(counter*50),[0,1,0]);
    translate([10+ 10*Math.sin(counter*0.1), 10*Math.sin(counter*0.1)+10,0]);
    rotate(rad(-90),[0,1,0])
    scale([2,2,2]);
    drawHelicopter();
    popMatrix();

    //DIAMOND
    pushMatrix();
    translate([-20,20,20]);
    rotate(counter,[0,1,0]);
    scale([4,4,4]);
    texture = mirrorTex;
    createBuffers('diamond');
    popMatrix();

    //OCTAGON
    pushMatrix();
    translate([20,5,-20]);
    scale([2,2,2]);
    texture = boulderTex;
    createBuffers('octagon');
    popMatrix();

    //SIGNPOST
    pushMatrix();
    translate([30,0,-30]);
    drawSign();
    popMatrix();

    popMatrix();
  }

  var Bezier = function(t) {
      return [
        (1-t)*(1-t)*(1-t),
        3*t*(1-t)*(1-t),
        3*t*t*(1-t),
        t*t*t
      ];
  }

  var BezierDerivative = function(t) {
      return [
        -3*(1-t)*(1-t),
        3*(1-3*t)*(1-t),
        3*t*(2-3*t),
        3*t*t
      ];
  }

  var Hermite = function(t) {
      return [
        2*t*t*t-3*t*t+1,
        t*t*t-2*t*t+t,
        -2*t*t*t+3*t*t,
        t*t*t-t*t
      ];
  }

  var HermiteDerivative = function(t) {
      return [
        6*t*t-6*t,
        3*t*t-4*t+1,
        -6*t*t+6*t,
        3*t*t-2*t
      ];
  }

  // This can generate both the function C(t) and the derivative C'(t),
  // depending on the basis passed in
  function Cubic(basis,P,t){
    var b = basis(t);
    var result=v3.mulScalar(P[0],b[0]);
    v3.add(v3.mulScalar(P[1],b[1]),result,result);
    v3.add(v3.mulScalar(P[2],b[2]),result,result);
    v3.add(v3.mulScalar(P[3],b[3]),result,result);
    return result;
  }

  ///////////////////////
  // PLANE
  ///////////////////////

  function drawPlane() {
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
  ///////////////////////
  //   SIGN
  //////////////////////

  function drawSign() {
    pushMatrix();
    texture = steelTex;
    scale([0.5,10,0.5]);
    translate([0,1,0]);
    createBuffers('cylinder');
    popMatrix();

    pushMatrix();
    texture = snakeTex;
    scale([20,10,0.25]);
    translate([0,2,0]);
    createBuffers('cube')
    popMatrix();
  }
  /////////////////////////////
  //   HELECOPTER
  //////////////////////////

  function drawHelicopter() {

    texture = steelTex;

    //cockpit
    inColor = [0.7,0.7,0.7];
    pushMatrix();
    translate([1,0,0]);
    scale([1,1,1]);
    createBuffers('sphere');
    popMatrix();

    //blades
    inColor = [0.0,0.0,0.0];
    var rotateInit = [0,rad(90)];
    for (var i = 0; i<rotateInit.length; i++) {
      pushMatrix();
      translate([0,1.25,0]);
      rotate(counter+rotateInit[i],[0,1,0]);
      scale([0.25,0.25,5])
      rotate(rad(90),[1,0,0]);
      createBuffers('cylinder');
      popMatrix();
    }

    //rails
    inColor = [0.0,1.0,0.0];
    coord = [[0,-1.5,1],[0,-1.5,-1]];
    for (var i = 0; i<coord.length;i++) {
      pushMatrix();
      translate(coord[i])
      scale([3,0.25,0.25]);
      rotate(rad(90),[0,0,1]);
      createBuffers('cylinder');
      popMatrix();
    }

    coord = [[0.5,-1,0.5],[-0.75,-1,0.5],[0.5,-1,-0.5],[-0.75,-1,-0.5]];
    var rotations = [-45,-45,45,45];
    for (var i = 0; i<coord.length;i++){
      pushMatrix();
      translate(coord[i]);
      rotate(rad(rotations[i]),[1,0,0]);
      scale([0.25,1.5,0.25])
      createBuffers('cylinder');
      popMatrix();
    }

    //axle
    inColor = [0.7,0.7,0.7];
    pushMatrix();
    translate([0,1,0]);
    scale([0.25,1,0.25]);
    createBuffers('cylinder');
    popMatrix();

    //body
    inColor = [1.0,0.0,0.0];
    pushMatrix();
    scale([3,1,0.5]);
    createBuffers('cube');
    popMatrix();

    inColor = [0.0,0.0,1.0];
    pushMatrix();
    translate([-1.75,0.3,0]);
    rotate(rad(-45),[0,0,1]);
    scale([1.5,0.75,0.5]);
    createBuffers('cube');
    popMatrix();

    inColor = [1.0,1.0,1.0];
  }

  //////////////////////
  //     HOUSE
  //////////////////////

  function drawHouse() {
    pushMatrix();

    //walls
    coord = [-1.4,1.4];
    for (var i = 0; i<2; i++) {
      pushMatrix();
      translate([coord[i],0,0]);
      scale([0.3,3,3]);
      createBuffers('cube');
      popMatrix();
    }

    for (var i = 0; i<2; i++) {
      pushMatrix();
      translate([0,0,coord[i]]);
      scale([3,3,0.3])
      createBuffers('cube');
      popMatrix();
    }

    texture = roofTex;
    //roof
    pushMatrix();
    translate([0,2.5,0]);
    scale([3,2,3]);
    createBuffers('pyramid');
    popMatrix();

    //chimney
    pushMatrix();
    translate([1,2.5,0]);
    scale([0.5,2,0.5]);
    createBuffers('cube');
    popMatrix();

    defaultTex();

    inColor=[0.5,0.5,0.5];
    //smoke
    for(i=0;i<5;i++) {
      pushMatrix();
      translate([1,2.5+(-(counter+i)*0.5)%5,0]);
      scale([0.2,0.2,0.2]);
      createBuffers('sphere');
      popMatrix();
    }
    inColor = [1.0,1.0,1.0];

    popMatrix();
  }


  /////////////////////////
  //        GROUND
  ///////////////////////

  function drawGround() {
    pushMatrix();

    pushMatrix();
    translate([0,0,0]);
    scale([100,100,100]);
    createBuffers('plane');
    popMatrix();

    popMatrix();
  }



  ///////////////////////
  //     PERSON
  ///////////////////////

  function drawPerson(speed) {
    pushMatrix();

    //head
    texture = snakeTex;
    pushMatrix();
      translate([0,1.25,0]);
      scale([0.8,0.8,0.8]);
      rotate(rad(130),[0,1,0]);
      createBuffers("sphere");
    popMatrix();

    //body
    texture = bodyTex;
    pushMatrix();
      translate([0,0,0]);
      scale([1,1.75,0.5]);
      rotate(rad(0),[0,0,0]);
      createBuffers("cube");
    popMatrix();

    //arms
    texture = checkersTex;
    inColor = [1.0,0.0,0.0];
    coord = [0.75,-0.75];
    var armRot = [rad(-70*Math.sin(counter*0.5)), rad(70*Math.sin(counter*0.5))]
    for (var i = 0; i<coord.length; i++) {
      pushMatrix();
        mat4.translate(Tmodel,Tmodel,[coord[i],0.75,0]);
        rotateFromPiv([0,-0.75,0], -armRot[i],[1,0,0]);
        mat4.scale(Tmodel,Tmodel,[0.5,1.75,0.5]);
        createBuffers("cube")
      popMatrix();
    }

    //legs
    coord = [0.25,-0.25];
    var legRot = [rad(70*Math.sin(counter*0.5)), rad(-70*Math.sin(counter*0.5))]
    for (var i = 0; i<coord.length; i++) {
      pushMatrix();
        mat4.translate(Tmodel,Tmodel,[coord[i],-0.75,0]);
        rotateFromPiv([0,-0.75,0], legRot[i],[1,0,0]);
        mat4.scale(Tmodel,Tmodel,[0.5,1.5,0.5]);
        createBuffers("cube")
      popMatrix();
    }

    inColor = [1.0,1.0,1.0];
    popMatrix();
  }


  ///////////////////////////////
  //      TRAIN
  ////////////////////////////

  function drawTrain() {
    pushMatrix();
    texture = steelTex;

    //front
    inColor = [1.0,1.0,0.0];
    pushMatrix();
      scale([2,0.5,0.5])
      rotate(rad(90),[0,0,1]);
      createBuffers("cylinder");
    popMatrix();

    //body
    pushMatrix();
      translate([1,0,0])
      scale([0.5,0.5,0.5]);
      rotate(rad(-90),[0,0,1])
      createBuffers("truncatedCone");
    popMatrix();

    //exhaust
    pushMatrix();
      translate([0.5,0.65,0])
      scale([0.25,1,0.25]);
      rotate(rad(180),[1,0,0]);
      inColor = [0.0,1.0,1.0];
      createBuffers("truncatedCone");
    popMatrix();

    //SMOKE
    inColor=[0.5,0.5,0.5];
    for(i=0;i<5;i++) {
      pushMatrix();
      translate([0.5,1+(-(counter+i)*0.5)%5,0]);
      scale([0.2,0.2,0.2]);
      rotate(rad(180),[1,0,0]);
      createBuffers('sphere');
      popMatrix();
    }

    //cockpit
    inColor = [0.0,0.0,1.0];
    pushMatrix();
      translate([-1,0,0]);
      scale([1,1,1]);
      rotate(rad(0),[0,0,0]);
      createBuffers("cube");
    popMatrix();

    inColor = [0.0,1.0,1.0];
    coord = [[-1.375,0.375],[-1.375,-0.375],[-0.625,0.375],[-0.625,-0.375]];
    for (var i=0;i<coord.length;i++) {
      pushMatrix();
        translate([coord[i][0],0.85,coord[i][1]]);
        scale([0.25,0.75,0.25]);
        rotate(rad(0),[0,0,0]);
        createBuffers("cube");
      popMatrix();
    }

    pushMatrix();
      translate([-1,1.125,0]);
      scale([1,0.25,1]);
      rotate(rad(0),[0,0,0]);
      createBuffers("cube");
    popMatrix();

     pushMatrix();
      translate([-1,1.5,0]);
      scale([1,0.5,1]);
      rotate(rad(0),[0,0,0]);
      inColor = [1.0,0.0,0.0];
      createBuffers("pyramid");
    popMatrix();

    //wheels
    inColor = [0.0,1.0,0.0];
    coord = [[-0.75,0.6],[0.5,0.6],[-0.75,-0.6],[0.5,-0.6]];
    for (i=0;i<coord.length;i++) {
      pushMatrix();
        translate([coord[i][0],-0.5,coord[i][1]]);
        scale([0.5,0.5,0.1]);
        rotate(rad(90),[1,0,0]);
        rotate(rad(counter*30),[0,1,0]);
        createBuffers("cylinder");
      popMatrix();
    }

    inColor=[1.0,1.0,1.0];
    popMatrix();
  }


  function createBuffers(block, sky) {
    switch (block) {
      case "truncatedCone":
        buffers = truncatedConeBuffer;
        break;
      case "torus":
        buffers = torusBuffer;
        break;
      case "plane":
        buffers = planeBuffer;
        break;
      case "cresent":
        buffers = cresentBuffer;
        break;
      case "disc":
        buffers = discBuffer;
        break;
      case "sphere":
        buffers = sphereBuffer;
        break;
      case "skyBox":
        buffers = skyBoxBuffer;
        break;
      case "cube":
        buffers = cubeBuffer;
        break;
      case "cylinder":
        buffers = cylinderBuffer;
        break;
      case "pyramid":
        buffers = pyramidBuffer;
        break;
      case "octagon":
        buffers = octagonBuffer;
        break;
      case "diamond":
        buffers = diamondBuffer;
        break;
    }


    var skyBox = sky || 0.0;
    Tmc = m4.multiply(Tmodel,Tcamera);
    Tmcp = m4.multiply(Tmc,Tprojection);
    twgl.setUniforms(shaders,{transf : Tmcp,
                               normalMatrix:m4.transpose(m4.inverse(Tmodel)),
                                 time:counter*10,
                                   patttern:pattern,
                                         inColor:inColor,
                                             day:sliderDay.value,
                                               tex: texture,
                                                skyBox: skyBox,});
    twgl.setBuffersAndAttributes(gl,shaders,buffers);
    twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
  }


  function drive() {
    var eye = [x,y,z];
    var target = [Math.sin(turn*0.1)*Math.cos(lift*0.1)+x,
                  Math.sin(lift*0.1)+y,
                  -Math.cos(turn*0.1)*Math.cos(lift*0.1)+z];
    var up = [0,1,0];
    x += Math.sin(turn*0.1)*forward*0.2*Math.cos(lift*0.1);
    z += -Math.cos(turn*0.1)*forward*0.2*Math.cos(lift*0.1);
    y += Math.sin(lift*0.1)*forward*0.2;
    return m4.inverse(m4.lookAt(eye, target, up));
  }

  function pushMatrix() {
    matrixStack.push(m4.copy(Tmodel));
  }

  function popMatrix() {
    Tmodel = matrixStack.pop(Tmodel);
  }

  function defaultTex() {
    texture = checkersTex;
    inColor = [1.0,0.6,0.0];
  }

  function scale(scale) {
    mat4.scale(Tmodel,Tmodel,scale);
  }

  function translate(translate) {
    mat4.translate(Tmodel,Tmodel,translate);
  }

  function rotate(rotate,axis) {
    mat4.rotate(Tmodel,Tmodel,rotate,axis);
  }

  function rotateFromPiv(piv, rotate, axis, z) {
    mat4.rotate(Tmodel,Tmodel,rotate,axis);
    var temp = mat4.create();
    mat4.translate(temp,temp,piv);
    mat4.multiply(Tmodel,Tmodel,temp);
  }
  function rad(degrees) {
    return (degrees)/180*Math.PI;
  }
  var lastDownTarget;
    document.addEventListener('mousedown', function(e) {
        lastDownTarget = event.target;
    }, false);

    document.addEventListener('keydown', function(e) {
        if(lastDownTarget == canvas) {

			//====================
			//	THE W KEY
			//====================
			if (e.keyCode == 87) {
                  forward+=1;
            }

			//====================
			//	THE S KEY
			//====================
			if (e.keyCode == 83) {
                  forward-=1;
            }

			//====================
			//	THE A KEY
			//====================
			if (e.keyCode == 65) {
                turn-=1;
            }

			//====================
			//	THE D KEY
			//====================
			if (e.keyCode == 68) {
                  turn+=1;
            }

			//====================
			//	THE SHIFT KEY
			//====================
			if (e.keyCode == 16) {
                  y+=0.1;
            }

			//====================
			//	THE CONTROL KEY
			//====================
			if (e.keyCode == 17) {
                  y-=0.1;
            }


			//====================
			//	THE UP KEY
			//====================
			if (e.keyCode == 38 && (control.selectedIndex === 2)) {
                  lift+=1;
            }

			//====================
			//	THE DOWN KEY
			//====================
			if (e.keyCode == 40 && (control.selectedIndex === 2)) {
                  lift-=1;
            }
			//====================
			//	THE RIGHT KEY
			//====================
			if (e.keyCode == 39 && (control.selectedIndex === 2)) {
                  turn+=1;
            }
			//====================
			//	THE LEFT KEY
			//====================
			if (e.keyCode == 37 && (control.selectedIndex === 2)) {
                  turn-=1;
            }
        }
    }, false);
reset.addEventListener('click', function(event) {

    slider2.value = -1;
    sliderX.value =0;
    sliderY.value=0;
    sliderZ.value=0;
    sliderScaleX.value=5;
    sliderScaleY.value=5;
    sliderScaleZ.value=5;
    rotator.setViewDistance(10);
    forward = 0;
    turn = 0;
    y=0;
    lift = 0;
}
                  );
togglePattern.addEventListener('click', function(event) {

    if (pattern)
      pattern = false;
      else
        pattern = true;}
                  );

/** This is high-level function.
 * It must react to delta being more/less than zero.
 */
function handle(delta) {
        if (delta < 0)
		rotator.setViewDistance(rotator.getViewDistance()+0.5);
        else
		rotator.setViewDistance(rotator.getViewDistance()-0.5);
}

/** Event handler for mouse wheel event.
 */
function wheel(event){
        var delta = 0;
        if (!event) /* For IE. */
                event = window.event;
        if (event.wheelDelta) { /* IE/Opera. */
                delta = event.wheelDelta/120;
        } else if (event.detail) { /** Mozilla case. */
                /** In Mozilla, sign of delta is different than in IE.
                 * Also, delta is multiple of 3.
                 */
                delta = -event.detail/3;
        }
        /** If delta is nonzero, handle it.
         * Basically, delta is now positive if wheel was scrolled up,
         * and negative, if wheel was scrolled down.
         */
        if (delta)
                handle(delta);
        /** Prevent default actions caused by mouse wheel.
         * That might be ugly, but we handle scrolls somehow
         * anyway, so don't bother here..
         */
        if (event.preventDefault)
                event.preventDefault();
	event.returnValue = false;
}

/** Initialization code.
 * If you use your own event management code, change it as required.
 */
if (window.addEventListener)
        /** DOMMouseScroll is for mozilla. */
        window.addEventListener('DOMMouseScroll', wheel, false);
/** IE/Opera. */
window.onmousewheel = document.onmousewheel = wheel;
 /**
 *  A SimpleRotator can be used to implement rotation by mouse
 *  (or touch) WebGL.  In this style of rotation, the y-axis
 *  is always vertical, with the positive direction pointing
 *  upwards in the view.  Dragging the mouse left and right
 *  rotates the view about the y-axis.  Dragging it up and down
 *  rotates the view about the x-axis, with the angle of rotation
 *  about the x-axis limited to the range -85 to 85.
 *
 *  NOTE: No error checking of parameters is done!
 *
 * Functions defined for an object, rotator, of type SimpleRotator:
 *
 *    rotator.getViewMatrix() -- returns an array of 16 numbers representing
 *       the view matrix corresponding to the current rotation.  The
 *       matrix is in column-matrix order (ready for use with glMatrix or
 *       gl.uniformMatrix4fv).  The view matrix takes into account the
 *       view distance and the center of view.
 *    rotator.setXLimit( d ) -- sets the range of possible rotations
 *       about the x-axis.  The paramter must be a non-negative number,
 *       and the value is clamped to the range 0 to 85.  The allowed range
 *       of rotation angles is from -d to d degrees.  If the value is zero
 *       only rotation about the y-axis is allowed.  Initial value is 85.
 *    rotation.getXLimit() -- returns the current limit
 *    rotation.setRotationCenter( vector ) -- Sets the center of rotation.
 *       The parameter must be an array of (at least) three numbers.  The
 *       view is rotated about this point.  Usually, you want the rotation
 *       center to be the point that appears at the middle of the canvas,
 *       but that is not a requirement.  The initial value is effectively
 *       equal to [0,0,0].
 *    rotation.getRotationCenter() -- returns the current value.
 *    rotation.setAngles( rotateY, rotateX ) -- sets the angles of rotation
 *       about the y- and x- axes.  The values must be numbers and are
 *       given in degrees.  The limit on the range of x rotations is enforced.
 *       If the callback function is defined, it is called.
 *    rotation.setViewDistance(dist) -- Sets the view distance to dist, which
 *       must be a number.
 *    rotation.getViewDistance() -- returns the current value.
 *
 * @param canvas must be a DOM element for a canvas.  A mouse
 *     listener and a touch listener are installed on the canvas.
 *     This is a required parameter.
 * @param callback if present, must be a function.  The function,
 *     if given, is called when the view changes.  Typically, it
 *     it would be a function that renders the image in the canvas,
 *     or possibly a function that renders the image only if no
 *     animation is running.
 * @param viewDistance if present, must be a number.  Gives the
 *     distance of the viewer from the center of rotation, which
 *     is ordinarily the origin.  If not present, the distance is
 *     0, which can be appropriate for an orthogonal projection.
 * @param rotY if present, must be a number.  Gives the initial rotation
 *     about the y-axis, in degrees. If not present, the default is zero.
 * @param rotX if present, must be a number.  Gives the initial rotation
 *     about the x-axis, in degrees. If not present, the default is zero.
 */
function SimpleRotator(canvas, callback, viewDistance, rotY, rotX) {
    canvas.addEventListener("mousedown", doMouseDown, false);
    canvas.addEventListener("touchstart", doTouchStart, false);
    var rotateX = (rotX === undefined)? 0 : rotX;
    var rotateY = (rotY === undefined)? 0 : rotY;
    var xLimit = 85;
    var center;
    var degreesPerPixelX = 90/canvas.height;
    var degreesPerPixelY = 180/canvas.width;
    this.getXLimit = function() {
        return xLimit;
    }
    this.setXLimit = function(limitInDegrees) {
        xLimit = Math.min(85,Math.max(0,limitInDegrees));
    }
    this.getRotationCenter = function() {
        return (center === undefined) ? [0,0,0] : center;
    }
    this.setRotationCenter = function(rotationCenter) {
        center = rotationCenter;
    }
    this.setAngles = function( rotY, rotX ) {
        rotateX = Math.max(-xLimit, Math.min(xLimit,rotX));
        rotateY = rotY;
        if (callback) {
            callback();
        }
    }
    this.setViewDistance = function( dist ) {
        viewDistance = dist;
    }
    this.getViewDistance = function() {
        return (viewDistance === undefined)? 0 : viewDistance;
    }
    this.getViewMatrix = function() {
        var cosX = Math.cos(rotateX/180*Math.PI);
        var sinX = Math.sin(rotateX/180*Math.PI);
        var cosY = Math.cos(rotateY/180*Math.PI);
        var sinY = Math.sin(rotateY/180*Math.PI);
        var mat = [  // The product of rotation by rotationX about x-axis and by rotationY about y-axis.
            cosY, sinX*sinY, -cosX*sinY, 0,
            0, cosX, sinX, 0,
            sinY, -sinX*cosY, cosX*cosY, 0,
            0, 0, 0, 1
        ];
        if (center !== undefined) {  // multiply on left by translation by rotationCenter, on right by translation by -rotationCenter
            var t0 = center[0] - mat[0]*center[0] - mat[4]*center[1] - mat[8]*center[2];
            var t1 = center[1] - mat[1]*center[0] - mat[5]*center[1] - mat[9]*center[2];
            var t2 = center[2] - mat[2]*center[0] - mat[6]*center[1] - mat[10]*center[2];
            mat[12] = t0;
            mat[13] = t1;
            mat[14] = t2;
        }
        if (viewDistance !== undefined) {  // multipy on left by translation by (0,0,-viewDistance)
            mat[14] -= viewDistance;
        }
        return mat;
    }
    var prevX, prevY;  // previous position, while dragging
    var dragging = false;
    var touchStarted = false;
    function doMouseDown(evt) {
        if (dragging) {
            return;
        }
        dragging = true;
        document.addEventListener("mousemove", doMouseDrag, false);
        document.addEventListener("mouseup", doMouseUp, false);
        var r = canvas.getBoundingClientRect();
        prevX = evt.clientX - r.left;
        prevY = evt.clientY - r.top;
    }
    function doMouseDrag(evt) {
        if (!dragging) {
            return;
        }
        var r = canvas.getBoundingClientRect();
        var x = evt.clientX - r.left;
        var y = evt.clientY - r.top;
        var newRotX = rotateX + degreesPerPixelX * (y - prevY);
        var newRotY = rotateY + degreesPerPixelY * (x - prevX);
        newRotX = Math.max(-xLimit, Math.min(xLimit,newRotX));
        prevX = x;
        prevY = y;
        if (newRotX != rotateX || newRotY != rotateY) {
            rotateX = newRotX;
            rotateY = newRotY;
            if (callback) {
                callback();
            }
        }
    }
    function doMouseUp(evt) {
        if (!dragging) {
            return;
        }
        dragging = false;
        document.removeEventListener("mousemove", doMouseDrag, false);
        document.removeEventListener("mouseup", doMouseUp, false);
    }
    function doTouchStart(evt) {
        if (evt.touches.length != 1) {
           doTouchCancel();
           return;
        }
        evt.preventDefault();
        var r = canvas.getBoundingClientRect();
        prevX = evt.touches[0].clientX - r.left;
        prevY = evt.touches[0].clientY - r.top;
        canvas.addEventListener("touchmove", doTouchMove, false);
        canvas.addEventListener("touchend", doTouchEnd, false);
        canvas.addEventListener("touchcancel", doTouchCancel, false);
        touchStarted = true;
    }
    function doTouchMove(evt) {
        if (evt.touches.length != 1 || !touchStarted) {
           doTouchCancel();
           return;
        }
        evt.preventDefault();
        var r = canvas.getBoundingClientRect();
        var x = evt.touches[0].clientX - r.left;
        var y = evt.touches[0].clientY - r.top;
        var newRotX = rotateX + degreesPerPixelX * (y - prevY);
        var newRotY = rotateY + degreesPerPixelY * (x - prevX);
        newRotX = Math.max(-xLimit, Math.min(xLimit,newRotX));
        prevX = x;
        prevY = y;
        if (newRotX != rotateX || newRotY != rotateY) {
            rotateX = newRotX;
            rotateY = newRotY;
            if (callback) {
                callback();
            }
        }
    }
    function doTouchEnd(evt) {
        doTouchCancel();
    }
    function doTouchCancel() {
        if (touchStarted) {
           touchStarted = false;
           canvas.removeEventListener("touchmove", doTouchMove, false);
           canvas.removeEventListener("touchend", doTouchEnd, false);
           canvas.removeEventListener("touchcancel", doTouchCancel, false);
        }
    }
}

  draw();
}
window.onload = setup;
