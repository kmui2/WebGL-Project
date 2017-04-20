// first we need to get the canvas and make an OpenGL context
	// in practice, you need to do error checking
  var canvas = document.getElementById("mycanvas");
  var gl =twgl.getWebGLContext(canvas);
  var m4 = twgl.m4;
  var v3 = twgl.v3;  
  var p = twgl.primitives;
  var truncatedConeBuffer = p.createTruncatedConeBufferInfo(gl,1,0.5,1,10,10);
  var torusBuffer = p.createTorusBufferInfo(gl,1,0.5,10,10);
  var planeBuffer = p.createPlaneBufferInfo(gl);
  var cresentBuffer = p.createCresentBufferInfo(gl,2,1,0.1,1,10,2);
  var discBuffer = p.createDiscBufferInfo(gl,1,10,10,0.5,10);
  var sphereBuffer = p.createSphereBufferInfo(gl,1,10,10);
  var skyBoxBuffer = p.createSphereBufferInfo(gl,1,10,10);
  var cubeBuffer = p.createCubeBufferInfo(gl);
  var cylinderBuffer = p.createCylinderBufferInfo(gl,1,1,10,10);

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
