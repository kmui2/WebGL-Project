//NEED TO USE GLOBALS
var truncatedConeBuffer, 
    torusBuffer,
    planeBuffer,
    cresentBuffer,
    discBuffer,
    sphereBuffer,
    skyBoxBuffer,
    cubeBuffer,
    cylinderBuffer,
    octagonBuffer,
    pyramidBuffer,
    diamondBuffer;


function initPrimitives() {
  truncatedConeBuffer = p.createTruncatedConeBufferInfo(gl,1,0.5,1,10,10);
  torusBuffer = p.createTorusBufferInfo(gl,1,0.5,10,10);
  planeBuffer = p.createPlaneBufferInfo(gl);
  cresentBuffer = p.createCresentBufferInfo(gl,2,1,0.1,1,10,2);
  discBuffer = p.createDiscBufferInfo(gl,1,10,10,0.5,10);
  sphereBuffer = p.createSphereBufferInfo(gl,1,10,10);
  skyBoxBuffer = p.createSphereBufferInfo(gl,1,10,10);
  cubeBuffer = p.createCubeBufferInfo(gl);
  cylinderBuffer = p.createCylinderBufferInfo(gl,1,1,10,10);

var octagonVertexPos = [
    //front
      //first row
         -1.0,  1.0 + 2/Math.sqrt(2),  1.0,  //0
        1.0,  1.0 + 2/Math.sqrt(2),  1.0,    //1
      //second row
         -1.0 - 2/Math.sqrt(2),  1.0,  1.0,  //2
         -1.0, 1.0,  1.0,                    //3
        1.0,  1.0,  1.0,                     //4
         1.0+2/Math.sqrt(2),  1.0,  1.0,     //5
      //third row
        -1.0-2/Math.sqrt(2),-1.0,1.0,        //6
        -1.0,-1.0,1.0,                       //7
        1.0,-1.0,1.0,                        //8
        1.0+2/Math.sqrt(2),-1.0,1.0,         //9
      //fourth row
        -1.0,-1.0-2/Math.sqrt(2),1.0,        //10
        1.0,-1.0-2/Math.sqrt(2),1.0,         //11

    //back
      //first row
         -1.0,  1.0 + 2/Math.sqrt(2),  -1.0,  //12
        1.0,  1.0 + 2/Math.sqrt(2),  -1.0,    //13
      //second row
         -1.0 - 2/Math.sqrt(2),  1.0,  -1.0,  //14
         -1.0, 1.0,  -1.0,                    //15
        1.0,  1.0,  -1.0,                     //16
         1.0+2/Math.sqrt(2),  1.0,  -1.0,     //17
      //third row
        -1.0-2/Math.sqrt(2),-1.0,-1.0,        //18
        -1.0,-1.0,-1.0,                       //19
        1.0,-1.0,-1.0,                        //20
        1.0+2/Math.sqrt(2),-1.0,-1.0,         //21
      //fourth row
        -1.0,-1.0-2/Math.sqrt(2),-1.0,        //22
       1.0,-1.0-2/Math.sqrt(2),-1.0,         //23
   ];
  var octagonTriangleIndices = [
    3,0,2, 4,1,0, 0,3,4, 1,4,5, 2,6,3, 7,3,6, 7,4,3, 7,8,4, 8,5,4, 5,8,9, 10,7,6, 10,8,7, 10,11,8, 11,9,8,
    0,1,12, 13,12,1, 17,13,1, 17,1,5, 21,17,5, 21,5,9, 23,21,9, 23,9,11, 10,22,23, 23,11,10, 6,18,22, 22,10,6, 14,18,6, 6,2,14, 12,14,2, 2,0,12,
    12,13,16, 16,15,12, 13,17,16, 16,17,21, 21,20,16, 20,21,23, 23,22,20, 22,19,20, 18,19,22, 18,14,15, 15,19,18, 15,16,20, 20,19,15, 15,14,12

  ];
      var octagonVertexNormals = [
    //front
      //first row
         -1.0, 1.0, 1.0, //0
        1.0, 1.0, 1.0,   //1
      //second row
        -1.0, 1.0, 1.0,  //2
        0.0, 0.0, 1.0,   //3
        0.0, 0.0, 1.0,   //4
        1.0, 1.0, 1.0,   //5
      //third row
        -1.0, 1.0, 1.0,  //6
        0.0, 0.0, 1.0,   //7
        0.0, 0.0, 1.0,   //8
        1.0, -1.0, 1.0,  //9
      //fourth row
        -1.0, -1.0, 1.0, //10
        1.0, -1.0, 1.0,  //11

    //back
      //first row
         -1.0, 1.0, -1.0,  //12
        1.0, 1.0, -1.0,   //13
      //second row
        -1.0, 1.0, -1.0,  //14
        0.0, 0.0, -1.0,   //15
        0.0, 0.0, -1.0,   //16
        1.0, 1.0, -1.0,   //17
      //third row
        -1.0, 1.0, -1.0,  //18
        0.0, 0.0, -1.0,   //19
        0.0, 0.0, -1.0,   //20
        1.0, -1.0, -1.0,  //21
      //fourth row
        -1.0, -1.0, -1.0, //22
        1.0, -1.0, -1.0,  //23
  ];
  var octagonTexCoords = [
    0.33, 1.0,
    0.66, 1.0,
    0.0, 0.66,
    0.33, 0.66,
    0.66, 0.66,
    1.0, 0.66,
    0.0, 0.33,
    0.33, 0.33,
    0.66, 0.33,
    1.0, 0.33,
    0.33, 0.0,
    0.66, 0.0,

    0.33, 1.0,
    0.66, 1.0,
    0.0, 0.66,
    0.33, 0.66,
    0.66, 0.66,
    1.0, 0.66,
    0.0, 0.33,
    0.33, 0.33,
    0.66, 0.33,
    1.0, 0.33,
    0.33, 0.0,
    0.66, 0.0,
  ]
  var arrays = {position:octagonVertexPos,
                 indices:octagonTriangleIndices,
                     inColor:inColor,
                       normal: octagonVertexNormals,
                         texcoord: octagonTexCoords,};
    octagonBuffer = twgl.createBufferInfoFromArrays(gl, arrays);

    var diamondVertexPos = [
    //top
      0.0, 1, 0.0,    //0
    //bottom square
      -0.5, 0, 0.5,  //1
      -0.5, 0, -0.5, //2
      0.5, 0, 0.5,   //3
      0.5, 0, -0.5,   //4
    //bottom
      0.0, -1, 0.0, //5
   ];
  var diamondTriangleIndices = [
      3,1,5, 4,3,5, 2,4,5, 2,5,1, 1,3,0, 3,4,0, 4,2,0, 1,0,2,
  ];
    var diamondVertexNormals = [
      0.0, 1.0, 0.0,   //0
      -1.0, 0.0, 1.0, //1
      -1.0, 0.0, -1.0,//2
      1.0, 0.0, 1.0,  //3
      1.0, 0.0, -1.0,  //4
      0.0, -1.0, 0.0,   //5
    ];
  var diamondTexCoord = [
    0.5, 0.5,
    0.0, 0.0,
    0.0, 1.0,
    1.0, 0.0,
    1.0, 1.0,
    0.5, 0.5,
  ]
   arrays = {position:diamondVertexPos,
                 indices:diamondTriangleIndices,
                     inColor:inColor,
                       normal:diamondVertexNormals,
                          texcoord: diamondTexCoord,};
   diamondBuffer = twgl.createBufferInfoFromArrays(gl, arrays);

    var pyramidVertexPos = [
    //top
      0.0, 0.5, 0.0,    //0
    //bottom square
      -0.5, -0.5, 0.5,  //1
      -0.5, -0.5, -0.5, //2
      0.5, -0.5, 0.5,   //3
      0.5, -0.5, -0.5   //4
   ];
  var pyramidTriangleIndices = [
    1,2,3, 2,4,3, 1,3,0, 3,4,0, 4,2,0, 1,0,2
  ];
    var pyramidVertexNormals = [
      0.0, 1.0, 0.0,   //0
      -1.0, 0.0, 1.0, //1
      -1.0, 0.0, -1.0,//2
      1.0, 0.0, 1.0,  //3
      1.0, 0.0, -1.0  //4
    ];
  var pyramidTexCoords = [
    0.5, 0.5,
    0.0, 0.0,
    0.0, 1.0,
    1.0, 0.0,
    1.0, 1.0,
  ]
  arrays = {position:pyramidVertexPos,
                 indices:pyramidTriangleIndices,
                     inColor:inColor,
                       normal:pyramidVertexNormals,
                         texcoord: pyramidTexCoords,
           };
   pyramidBuffer = twgl.createBufferInfoFromArrays(gl, arrays);
}
